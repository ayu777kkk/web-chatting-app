const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');

const postInvite = async (req, res) => {
    const { targetMailAddress } = req.body;

    const { userId, mail } = req.user;

    // Check if the target mail address is user or not

    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res.status(409).send('Sorry. You cannot invite yourself. ');
    }

    const targetUser = await User.findOne({ mail: targetMailAddress.toLowerCase() });

    if (!targetUser) {
        return res.status(404).send(`Friend of ${targetMailAddress} has not been found. `);
    }

    // Check if the user is already invited or not

    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id,
    });

    if (invitationAlreadyReceived) {
        return res.status(409).send('Invitation already sent. ');
    }

    // Check if the user is already a friend
    
    const userAlreadyFriend = await targetUser.friends.some((friendId) => 
        friendId.toString() === userId.toString()
    );

    if (userAlreadyFriend) {
        return res.status(409).send('Friend already exists. Please check the friend list again. ');
    }

    // Create a new invitation in database

    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id,
    });

    return res.status(201).send('Invitation has been sent successfully. ');
};

module.exports = postInvite;