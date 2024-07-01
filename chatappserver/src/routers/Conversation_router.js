const express = require('express');
const router = express.Router();
const Conversation_controller = require('../controllers/Conversation_controller')

router.post('/createConversation',Conversation_controller.CreateConversation)
router.get('/GetConversation/:userId',Conversation_controller.GetConversation)


module.exports = router;