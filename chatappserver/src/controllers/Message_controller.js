const Conversation = require('../models/Conversation_Model');
const Message = require('../models/Message_Model');
const User = require('../models/User_Model');


const creteMessage = async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        if (!senderId || !message) return res.status(400).send('Please fill all required fields');
      
        const newMessage = new Message({
            conversationId,
            senderId,
            Message: message,
        });
        await newMessage.save();
        return res.status(200).json({ message: "Message Send Successfully" ,newMessage});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "faild error ", error })
    }
};
const GetMessage = async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        // const message = await Message.find({ conversationId:conversationId },{conversationId:1});

        const message = await Message.find({ conversationId:conversationId },{conversationId:1});
        console.log(message);
        const messageuserData = await Promise.all(message.map(async (message) => {
            const user = await User.findById(message.senderId);
            return { user: {_id:user._id, email: user.email, fullname: user.name }, message: message.Message ,conversationId:message.conversationId}
        }));
        
        return res.status(200).json({ message: "Message Get Successfully", messageuserData });
      
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "faild error ", error })
    }
};


module.exports = { creteMessage, GetMessage }