const cookieService = require('../service/cookie')
const { AccessDBError } = require('../lib/error')

const logout = {}
logout.logout = async (ctx, next) => {
    const { userIdbyCookie } = ctx.request.body
    if (!userIdbyCookie) {
        throw new InvalidQueryError()
    }

    const cookieData = await cookieService.findOneAndUpdate(
        {userId: userIdbyCookie},
        {
            status: 0,
            expiredTime: Date.now()
        }
    )
    if (!cookieData) {
        throw new AccessDBError()
    } else {
        ctx.cookies.set('cookie','')
        ctx.result = true
        ctx.message = 'Logout'
    }
    return next()
}

module.exports = logout