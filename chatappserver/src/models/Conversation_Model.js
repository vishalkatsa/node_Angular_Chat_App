const {Schema, default: mongoose} = require('mongoose');
const mongoURI =  require('../database/database');

const ConversationSchema = Schema({
    members:{
        type:Array,
        required:true,
    },
});

const Conversation = mongoURI.model("conversation",ConversationSchema);

module.exports = Conversation;