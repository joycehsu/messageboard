const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

module.exports = {
    name: "cookie",
    schema: {
        userId: { type:String, required:true, unique:true },
        cookie: { type:String, required:true },
        status: { type:Number, required:true, enum: [0, 1, 2] },   //0:False(Logout), 1:True(Login), 2:Expired logout
        expiredTime: { type:Date, default:Date.now() + 30 * 60000} //Add 30minutes
    }
}
