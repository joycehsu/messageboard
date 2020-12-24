const { email } = require('../lib/regular_exp')
const regularExp = require('../lib/regular_exp')
const { InvalidQueryError } = require('../lib/error')

async function RequestValueCheck(ctx, next) {
    const {email, password, gender, birthday, messageTime} = ctx.request.body
    if (email !== undefined) {
        var success = await regularExp.email(email)
        if (success === false) {
            throw new InvalidQueryError('Email format is wrong.')
        }
    }

    if (password !== undefined) {
        var success = await regularExp.password(password)
        if (success === false) {
            throw new InvalidQueryError('Password format is wrong.')
        }
    }

    if (gender !== undefined) {
        var genderList = [0, 1, 2]
        var success = genderList.includes(gender)
        if (success === false) {
            throw new InvalidQueryError('Gender value need in [0,1,2].')
        }
    }

    if (birthday !== undefined) {
        var success = await regularExp.date(birthday)
        if (success === false) {
            throw new InvalidQueryError('Birthday format is wrong. (yyyy-MM-DD)')
        }
    }

    if (messageTime !== undefined) {
        var success = await regularExp.time(messageTime)
        if (success === false) {
            throw new InvalidQueryError('MessageTime format is wrong. (yyyy-MM-DD HH:mm)')
        }
    }
    await next()
}

module.exports = RequestValueCheck