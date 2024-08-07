const Conversation = require('../models/conversation');
const Message = require('../models/message');
const chatUpdates = require('./updates/chat');
const mongoose = require('mongoose');

const directChatHistoryHandler = async (socket, data) => {
    try {
        const { userId } = socket.user;
        const { receiverId } = data;

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverId] },
            //type: "DIRECT"
        });

        if (conversation) {
            chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = directChatHistoryHandler;