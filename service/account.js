const User = require('../models/index').getModel('user')

const account = {}
account.login = async (userData) => {
    let result = await User.findOne(userData)
    return result
}

account.signup = async (userData) => {
    let result = await User.create(userData)
    return result
}

account.update = async (condition, userData) => {
    let result = await User.updateOne(condition, userData)
    return result
}

module.exports = account