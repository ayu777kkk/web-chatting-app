const { disconnect } = require('mongoose');
const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');

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
        console.log('a user connected');
        console.log(socket.id);

        newConnectionHandler(socket, io);
        emitOnlineUsers();

        socket.on("direct-message", (data) => {
            directMessageHandler(socket, data);
        });

        socket.on('direct-chat-history', (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on('disconnect', () => {
            disconnectHandler(socket);
        })
    });

    setInterval(() => {
        emitOnlineUsers();
    }, [8000]);
};

module.exports = {
    registerSocketServer,
};