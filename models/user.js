const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

module.exports = {
    name: "user",
    schema: {
        email: { type:String, required:true, unique:true },
        password: { type:String, required:true },
        createTime: { type:Date, default:Date.now() },
        lastLoginTime: { type:Date, default:Date.now() },
        updateTime: { type:Date, default:Date.now() }
    }
}
