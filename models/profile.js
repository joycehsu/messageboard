const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

module.exports = {
    name: "profile",
    schema: {
        userId: { type: String, required:true },
        name: String,
        nickName: String,
        birthday: { type:Date, default:null },
        gender: { type:Number, enum: [0, 1, 2] },    //0:Men, 1:Female, 2:Other
        headShot: String,
        createTime: { type:Date, default:Date.now() },
        updateTime: { type:Date, default:Date.now() }
    }
}
