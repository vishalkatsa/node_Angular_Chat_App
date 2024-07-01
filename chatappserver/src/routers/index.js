const express = require('express');
const router = express.Router();
const user_router = require('./user_router');
const Conversation_router = require('./Conversation_router');
const Message_router = require('./Message_router');


router.use('/auth',user_router);
router.use('/Conversation',Conversation_router);
router.use('/Message',Message_router);


module.exports = router;