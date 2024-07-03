const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        }
    ],
    //type: { type: String, enum: ['DIRECT', 'GROUP'], required: true },
    type: {
        type: String,
    },
});

module.exports = mongoose.model('Conversation', conversationSchema);