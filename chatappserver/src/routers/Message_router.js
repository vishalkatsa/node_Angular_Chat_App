const express = require('express');
const router = express.Router();
const Message_controller = require('../controllers/Message_controller')

router.post('/createMessage',Message_controller.creteMessage)
router.get('/GetMessage/:conversationId',Message_controller.GetMessage)


module.exports = router;
