const mongoose = require('mongoose');
const { recompileSchema } = require('./user');

const Schema = mongoose.Schema;

const friendInvitationSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('FriendInvitation', friendInvitationSchema);