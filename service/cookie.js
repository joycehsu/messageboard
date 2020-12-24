const Cookie = require('../models/index').getModel('cookie')

const cookie = {}
cookie.check = async (cookieData) => {
    let result = await Cookie.findOne(cookieData)
    return result
}

cookie.register = async (cookieData) => {
    let result = await Cookie.create(cookieData)
    return result
}

cookie.update = async (condition, cookieData, all=false) => {
    let result = {}
    if (all === true) {
        result = await Cookie.updateMany(condition, cookieData)
    } else {
        result = await Cookie.updateOne(condition, cookieData)
    }
    return result
}

cookie.findOneAndUpdate = async (condition, cookieData) => {
    let result = await Cookie.findOneAndUpdate(condition, cookieData)
    return result
}

module.exports = cookie