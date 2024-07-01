const mongoose = require("mongoose");

const mongoURI = `mongodb://127.0.0.1:27017/chatapp`

mongoose.connect(mongoURI).then(()=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(()=>{
    console.log('Error in DB connection: ' + error)
})



module.exports = mongoose