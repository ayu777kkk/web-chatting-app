const serverStore = require('../serverStore');
const roomsUpdates = require('./updates/rooms');

const roomJoinHandler = (socket, data) => {
    const { roomId } = data;

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id,
    };

    const roomDetails = serverStore.getActiveRoom(roomId);
    serverStore.joinActiveRoom(roomId, participantDetails);

    // send info to users in the room that a new user has joined
    roomDetails.participants.forEach((participant) => {
        if (participant.socketId !== participantDetails.id) {
            socket.to(participant.socketId).emit('conn-prep', {
                connUserSocketId: participantDetails.socketId,
            });
        }
    });

    roomsUpdates.updateRooms();
};

module.exports = roomJoinHandler;