const roomSignalingDataHandler = (socket, data) => {
    const { connUserSocketId, signal } = data;
    console.log('roomSignalingDataHandler ', connUserSocketId, signal);

    const signalingData = { signal, connUserSocketId: socket.id };
    socket.to(connUserSocketId).emit('conn-signal', signalingData);
};

module.exports = roomSignalingDataHandler;