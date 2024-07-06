const roomInitializeConnectionHandler = (socket, data) => {
    const { connUserSocketId } = data;
    console.log(`User ${connUserSocketId} has connected to the room`);

    const initialData = { connUserSocketId: socket.id };
    socket.to(connUserSocketId).emit('conn-init', initialData);
};

module.exports = roomInitializeConnectionHandler;