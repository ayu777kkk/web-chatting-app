const { disconnect } = require('mongoose');
const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        },
    });

    // Middleware to authenticate socket connections
    io.use((socket, next) => {
        authSocket(socket, next);
    });

    // Socket connection event
    io.on('connection', (socket) => {
        console.log('a user connected');
        console.log(socket.id);

        newConnectionHandler(socket, io);

        socket.on('disconnect', () => {
            disconnectHandler(socket);
        })
    });
};

module.exports = {
    registerSocketServer,
};