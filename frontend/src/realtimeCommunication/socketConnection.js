import io from'socket.io-client';
import { 
    setPendingFriendsInvitations, 
    setFriends, 
    setOnlineUsers 
} from '../store/actions/friendsActions';
import store from '../store/store';

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
};