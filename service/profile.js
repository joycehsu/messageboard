const userProfile = require('../models/index').getModel('profile')

const profile = {}
profile.check = async (userData) => {
    let result = await userProfile.findOne(userData)
    return result
}

profile.create = async (userData) => {
    let result = await userProfile.create(userData)
    return result
}

profile.update = async (condition, userData) => {
    let result = await userProfile.updateOne(condition, userData)
    return result
}

module.exports = profile