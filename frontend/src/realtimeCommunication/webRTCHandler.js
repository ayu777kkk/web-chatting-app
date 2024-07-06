import store from '../store/store';
import { setLocalStream, setRemoteStreams } from '../store/actions/roomActions';
import * as socketConnection from './socketConnection';
import Peer from 'simple-peer';

const getConfiguration = () => {
    const turnIceServers = null; // TODO: add TURN server configuration

    if (turnIceServers) {
        // TODO: use TURN server credentials
    } else {
        console.warn('Using only STUN server for WebRTC connections');
        return {
            iceServers: [
                {
                    URLs:'stun:stun.l.google.com:19302'
                }
            ]
        }
    }
};

const audioOnlyConstraints = {
    audio: true,
    video: false
};

const defaultConstraints = {
    audio: true,
    video: true
};

export const getLocalStreamPreview = (audioOnly = false, callback) => {
    const constraints = audioOnly ? audioOnlyConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints)
       .then((stream) => {
            store.dispatch(setLocalStream(stream));
            callback();
        }).catch((error) => {
            console.log('Error getting local stream: ', error);
            console.log('cannot get an access to the local stream')
        });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const localStream = store.getState().room.localStream;
    console.log('heere!!')

    if (isInitiator) {
        console.log('preparing new peer connection as initiator');
    } else {
        console.log('preparing new peer connection as receiver');
    }

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        stream: localStream,
    });
    console.log('peers:', peers);

    peers[connUserSocketId].on('signal', (data) => {
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId,
        };
        console.log('signal data:', signalData);

        socketConnection.signalPeerData(signalData);
    });

    peers[connUserSocketId].on('stream', (remoteStream) => {
        // TODO: add remote stream to our server store
        console.log('remote stream received came from peer connection');
        console.log(remoteStream);
        remoteStream.connUserSocketId = connUserSocketId;
        addNewRemoteStream(remoteStream);
    });
};

export const handleSignalingData = (data) => {
    const { connUserSocketId, signal } = data;

    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
};

export const addNewRemoteStream = (remoteStream) => {
    // TODO: add remote stream to our server store
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];
    
    store.dispatch(setRemoteStreams(newRemoteStreams));
};