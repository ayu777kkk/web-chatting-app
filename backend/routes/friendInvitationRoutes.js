const express = require('express');
const router = express.Router();
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');
const friendInvitationControllers = require('../controllers/friendInvitation/friendInvitationControllers')

const postFriendInvitationSchema = joi.object({
    targetMailAddress: joi.string().email(),
});

router.post(
    '/invite', 
    auth, 
    validator.body(postFriendInvitationSchema), 
    friendInvitationControllers.controllers.postInvite
);

module.exports = router;