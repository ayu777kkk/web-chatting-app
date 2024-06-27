import io from'socket.io-client';
import { setPendingFriendsInvitations } from '../store/actions/friendsActions';

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

    socket.on('friends-inviations', (data) => {
        const { pendingInvitations } = data;

        store.dispatch(setPendingInvitations(pendingInvitations));
    });
};