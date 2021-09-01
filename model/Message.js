const { Schema, model } = require("mongoose");

let messageSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    sendMessage:{
        senderId:{
        
        }
    }
})