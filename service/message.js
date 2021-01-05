const messageBoard = require('../models/index').getModel('message')

const message = {}
message.findById = async (messageData) => {
    let result = await messageBoard.findById(messageData)
    return result
}

message.check = async (messageData) => {
    let result = await messageBoard.findOne(messageData)
    return result
}

message.create = async (messageData) => {
    let result = await messageBoard.create(messageData)
    return result
}

message.update = async (condition, messageData) => {
    let result = await messageBoard.updateOne(condition, messageData)
    return result
}

message.delete = async (condition) => {
    let result = await messageBoard.deleteOne(condition)
    return result
}

module.exports = message
