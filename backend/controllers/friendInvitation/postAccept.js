const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdate = require('../../socketHandlers/updates/friends');

const postAccept = async (req, res) => {
    try {
        const { id } = req.body;

        const invitation = await FriendInvitation.findById(id);

        if (!invitation) {
            return res.status(401).send('Error occured. Please try again later.');
        }

        const { senderId, receiverId } = invitation;

        // add friends to both users
        const senderUser = await User.findById(senderId);
        senderUser.friends = [...senderUser.friends, receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends, senderId];

        await senderUser.save();
        await receiverUser.save();

        // delete invitation
        await FriendInvitation.findByIdAndDelete(id);

        // update list of friends if the user is online
        friendsUpdate.updateFriends(senderId.toString());
        friendsUpdate.updateFriends(receiverId.toString());

        // update the list of friends pending invitations
        friendsUpdate.updateFriendsPendingInvitations(receiverId.toString());

        return res.status(200).send('Friend successfully added.')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong' );
    }
};

module.exports = postAccept;