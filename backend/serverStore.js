const connectedUsers = new Map();

const addNewConnectedUser = ({ socketId, userId }) => {
    connectedUsers.set(socketId, { userId });
    console.log('New user connected');
    console.log(connectedUsers);
};

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log('User disconnected');
        console.log(connectedUsers);
    }
};

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
};