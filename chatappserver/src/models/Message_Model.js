const { Schema, default: mongoose } = require('mongoose');
const mongoURI =  require('../database/database');

const MessageModel = Schema({
    conversationId:{
        type:String,
    },
    senderId:{
        type:String,
    },
    Message:{
        type:String,
    }
}
);

const Message = mongoURI.model("message", MessageModel);

module.exports = Message;