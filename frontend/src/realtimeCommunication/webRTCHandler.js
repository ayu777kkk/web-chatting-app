import store from '../store/store';
import { setLocalStream } from '../store/actions/roomActions';

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