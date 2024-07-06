const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const roomCreateHandler = require('./socketHandlers/roomCreateHandler');
const roomJoinHandler = require('./socketHandlers/roomJoinHandler');
const roomLeaveHandler = require('./socketHandlers/roomLeaveHandler');
const roomInitializeConnectionHandler = require('./socketHandlers/roomInitializeConnectionHandler');
const roomSignalingDataHandler = require('./socketHandlers/roomSignalingDataHandler');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        },
    });

    serverStore.setSocketServerInstance(io);

    // Middleware to authenticate socket connections
    io.use((socket, next) => {
        authSocket(socket, next);
    });

    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit('online-users', { onlineUsers });
    };

    // Socket connection event
    io.on('connection', (socket) => {

        newConnectionHandler(socket, io);
        emitOnlineUsers();

        socket.on("direct-message", (data) => {
            directMessageHandler(socket, data);
        });

        socket.on('direct-chat-history', (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on('room-create', () => {
            roomCreateHandler(socket);
        });

        socket.on('room-join', (data) => {
            roomJoinHandler(socket,data);
        });

        socket.on('room-leave', (data) => {
            roomLeaveHandler(socket, data);
        });

        socket.on('conn-init', (data) => {
            console.log('conn-init backend')
            roomInitializeConnectionHandler(socket, data);
        });

        socket.on('conn-signal', (data) => {
            console.log('conn-signal backend')
            roomSignalingDataHandler(socket, data);
        });

        socket.on('disconnect', () => {
            disconnectHandler(socket);
        });
    });

    setInterval(() => {
        emitOnlineUsers();
    }, [8000]);
};

module.exports = {
    registerSocketServer,
};