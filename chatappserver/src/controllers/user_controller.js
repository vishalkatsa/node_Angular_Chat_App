const generateToken = require('../jwt/JWT');
const User = require('../models/User_Model');


const createuser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
       
            const userFind = await User.findOne({email});
            if (userFind === null) {
                const user = new User({
                    name,
                    email,
                    password,
                    pic
                });
                const newUser = await user.save();
                return res.status(200).json({ message: 'newUser_200' })
            }else{
                return res.status(201).json({ message: 'UserAble_201' })
            }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'userNotCreate_500', error })
    }
};
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFind = await User.findOne({email});

        if (userFind === null) {
            return res.status(201).json({ message: 'UserNotAble_201' })
        }else{
            const checkPassWord = userFind.password === password;
            console.log(checkPassWord);
            const token = await generateToken(userFind._id)
            const userData = {
                name:userFind.name,
                email:userFind.email,
                pic:userFind.pic,
                _id:userFind._id
            }
            return res.status(200).json({ message: 'userLoginTrue_200',token ,userData })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'userNotCreate_500', error })
    }
};

const getUsers = async (req, res) => {
    try {
        // const user = await User.find({},{email});

        const user = await User.find({},{email});
        const userData = await Promise.all(user.map(async(user)=>{
            return {user:{email: user.email, fullname:user.name ,receiverId:user._id}}
        }))
        return res.status(200).json({ user: "user Get Successfully", userData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ user: "faild error ", error })
    }
};



module.exports = { createuser, loginuser ,getUsers }