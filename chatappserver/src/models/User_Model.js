const {Schema, default: mongoose} = require('mongoose');
const mongoURI = require('../database/database');

const UserModel = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
}, {
    timestamps: true
});

const User = mongoURI.model("user",UserModel);

module.exports = User;