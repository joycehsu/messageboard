const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

module.exports = {
    name: "reply_message",
    schema: {
        _id: { type: ObjectId , default:new mongoose.Types.ObjectId() },
        parentId: { type: String, required:true },
        userId: { type: String, required:true },
        messageTime: { type: Date, required:true },
        content: { type: String, required:true },
        createTime: { type:Date, default:Date.now() },
        updateTime: { type:Date, default:Date.now() },
        status: { type:Boolean, default:true }
    }
}