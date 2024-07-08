import store from '../store/store';
import {
    setOpenRoom,
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setRemoteStreams,
    setScreenSharingStream,
    setIsUserJoinedWithAudioOnly
} from '../store/actions/roomActions';
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
    const successCallback = () => {
        store.dispatch(setOpenRoom(true, true));

        // const audioOnly = store.getState().room.audioOnly;
        // store.dispatch(setIsUserJoinedWithAudioOnly(audioOnly));
        socketConnection.createNewRoom();
    };

    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback);
};

export const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
    const { activeRooms } = data;

    const friends = store.getState().friends.friends;
    const rooms = [];

    activeRooms.forEach((room) => {
        friends.forEach((friend) => {
            if (friend.id === room.roomCreator.userId) {
                rooms.push({ ...room, creatorUsername: friend.username });
            }
        });
    });

    store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
    const successCallback = () => {
        store.dispatch(setRoomDetails({ roomId }));
        store.dispatch(setOpenRoom(false, true));
        // const audioOnly = store.getState().room.audioOnly;
        // store.dispatch(setIsUserJoinedWithAudioOnly(audioOnly));
        socketConnection.joinRoom({ roomId });
    };

    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback);
};

export const leaveRoom = () => {
    const roomId = store.getState().room.roomDetails.roomId;

    const localStream = store.getState().room.localStream;
    if (localStream) {
        localStream.getTracks().forEach((track) => {
            track.stop();
        });
        store.dispatch(setLocalStream([]));
    }
    
    const ScreenSharingStream = store.getState().room.ScreenSharingStream;
    if (ScreenSharingStream) {
        ScreenSharingStream.getTracks().forEach((track) => {track.stop()});
        store.dispatch(setScreenSharingStream(null));
    }

    store.dispatch(setRemoteStreams(null));
    webRTCHandler.closeAllConnections();

    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
    socketConnection.leaveRoom({ roomId });
};