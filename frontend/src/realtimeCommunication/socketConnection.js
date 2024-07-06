import io from'socket.io-client';
import { 
    setPendingFriendsInvitations, 
    setFriends, 
    setOnlineUsers 
} from '../store/actions/friendsActions';
import store from '../store/store';
import { updateDirectChatHistoryIfActive} from '../shared/utils/chat';
import * as roomHandler from './roomHandler';
import * as webRTCHandler from './webRTCHandler';

let socket = null;

export const connectWithSocketServer = (userDetails) => {
    if (socket) {
        return;
    }

    const jwtToken = userDetails.token;

    socket = io('http://localhost:5002', {
        auth: {
            token: jwtToken,
        },
    });

    socket.on('connect', () => {
        console.log('Successfully connected to socket server');
        console.log(socket.id);
    });

    socket.on('friends-invitations', (data) => {
        const { pendingInvitations } = data;
        // console.log('friends-invitations event came');
        // console.log(pendingInvitations);

        store.dispatch(setPendingFriendsInvitations(pendingInvitations));
    });

    socket.on('friends-list', (data) => {
        const { friends } = data;
        store.dispatch(setFriends(friends));
    });

    socket.on('online-users', (data) => {
        const { onlineUsers } = data;
        store.dispatch(setOnlineUsers(onlineUsers))
    });

    socket.on('direct-chat-history', (data) => {
        updateDirectChatHistoryIfActive(data);
    });

    socket.on('room-create', (data) => {
        roomHandler.newRoomCreated(data);
    });

    socket.on('active-rooms', (data) => {
        roomHandler.updateActiveRooms(data);
    });

    socket.on('conn-prep', (data) => {
        const { connUserSocketId } = data;
        // console.log('conn-prep received, preparing new peer connection as receiver');
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

        socket.emit('conn-init', { connUserSocketId: connUserSocketId });
    });

    socket.on('conn-init', (data) => {
        const { connUserSocketId } = data;
        // console.log('conn-init received, preparing new peer connection as initiator');
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on('conn-signal', (data) => {
        console.log('conn-signal received, handling signaling data');
        webRTCHandler.handleSignalingData(data);
    });
};

export const sendDirectMessage = (data) => {
    socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data) => {
    socket.emit('direct-chat-history', data);
};

export const createNewRoom = () => {
    socket.emit('room-create');
};

export const joinRoom = (data) => {
    socket.emit('room-join', data);
};

export const leaveRoom = (data) => {
    socket.emit('room-leave', data);
};

export const signalPeerData = (data) => {
    console.log('signalPeerData called');
    socket.emit('conn-signal', data);
};