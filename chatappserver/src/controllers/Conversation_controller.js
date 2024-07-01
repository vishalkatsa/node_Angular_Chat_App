const Conversation = require('../models/Conversation_Model');
const User = require('../models/User_Model');


const CreateConversation = async (req,res) => {
    try {
        const { senderId, reseiverId } = req.body;
        const newConversation = new Conversation({
            members: [senderId, reseiverId]
        });
        await newConversation.save();
        return res.status(200).json({ message: "Conversation Create Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error 500", error })
    }
};
const GetConversation = async (req,res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({ members: { $in: [userId] } });
        const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await User.findById(receiverId);
            return {
                user: { email: user.email, fullname: user.name ,reseiverId:user._id}, 
                conversationId: conversation._id, 
            };
        }));
        return res.status(200).json({ message: "Conversations Retrieved Successfully", conversationUserData }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error 500", error });
    }
};
module.exports = { CreateConversation, GetConversation };