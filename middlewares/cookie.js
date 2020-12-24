const { ForbiddenError, AccessDBError } = require('../lib/error')
const config = require('../config/cookie')
const cookieService = require('../service/cookie')

async function checkCookie(ctx, next) {
    let cookie = ctx.cookies.get('cookie')
    const check = await cookieService.check({
        cookie: cookie
    })
    if (!check) {
        throw new ForbiddenError('Pleasec login at first.')
    } else {
        if (check.status === 0 || check.status === 2) {
            throw new ForbiddenError('Pleace login again.')
        } else {
            if (Date.now() < check.expiredTime){
                ctx.request.body.userIdbyCookie = check.userId
                await next()

                const update = await cookieService.update({
                    status: 1,
                    expiredTime: Date.now() + 30 * 60000
                })
                if (!update) {
                    throw new AccessDBError()
                }
            } else {
                // redirect(302, 'https://joyce-web/login')
                ctx.cookies.set('cookie','')
                const update = await cookieService.update({
                    status: 2
                })
                throw new ForbiddenError('Pleace login again.')
            }
        }
    }
}

module.exports = {checkCookie}