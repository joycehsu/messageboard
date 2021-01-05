const replayMessageBoard = require('../models/index').getModel('reply_message')

const replyMessage = {}
replyMessage.findById = async (messageData) => {
    let result = await replayMessageBoard.findById(messageData)
    return result
}

replyMessage.check = async (messageData) => {
    let result = await replayMessageBoard.findOne(messageData)
    return result
}

replyMessage.create = async (messageData) => {
    let result = await replayMessageBoard.create(messageData)
    return result
}

replyMessage.update = async (condition, messageData, all=false) => {
    let result = {}
    if (all === true) {
        result = await replayMessageBoard.updateMany(condition, messageData)
    } else {
        result = await replayMessageBoard.updateOne(condition, messageData)
    }
    return result
}

replyMessage.delete = async (condition) => {
    let result = await replayMessageBoard.deleteOne(condition)
    return result
}

module.exports = replyMessage
