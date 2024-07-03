const Message = require('../models/message');
const Conversation = require('../models/conversation');
const chatUpdates = require('./updates/chat');

const directMessageHandler = async (socket, data) => {
    try {
        const { userId } = socket.user;
        const { receiverId, content } = data;

        // create new message object
        const message = await Message.create({
            content: content,
            author: userId,
            date: new Date(),
            type: "DIRECT",
        });

        // find if conversation exists between sender and receiver -if not create new one
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverId] },
        });

        if (conversation) {
            conversation.messages.push(message._id);
            await conversation.save();

            // perform and update to sender and receiver if is online
            chatUpdates.updateChatHistory(conversation._id.toString());
        } else {
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverId],
                type: "DIRECT",
            });

            // perform an update to sender and receiver if is online
            chatUpdates.updateChatHistory(newConversation._id.toString());
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = directMessageHandler;