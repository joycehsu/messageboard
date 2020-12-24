const config = require('../config/cookie')
const userService = require('../service/account')
const cookieService = require('../service/cookie')
const { UnauthorizedError, InvalidQueryError, ForbiddenError, AccessDBError } = require('../lib/error')
const hash = require('../lib/hash')

const login = {}
login.login = async (ctx, next) => {
    const {email, password} = ctx.request.body
    if (!email || !password){
        throw new InvalidQueryError('Need Email and password')
    }

    var hashPassword = await hash(password)
    const user = await userService.login({
        email: email
    })
    if (!user) {
        throw new UnauthorizedError('No register of the email was found.')
    } else {
        if (hashPassword !== user.password) {
            throw new ForbiddenError('The password is not correct.')
        } else {
            var currentDate = (new Date()).valueOf().toString()
            var cookieData = email+password+currentDate
            var hashCookieData = await hash(cookieData)

            ctx.cookies.set(
                'cookie',
                hashCookieData,
                {config})

            const check = await cookieService.check({
                userId : user._id
            })
            if (!check) {
                const cookie = await cookieService.register({
                    cookie : hashCookieData,
                    userId : user._id,
                    status : 1
                })
                if (!cookie) {
                    throw new AccessDBError()
                }
            } else {
                var time = Date.now() + 30 * 60000
                const cookie = await cookieService.update(
                    { userId : user._id },
                    {
                        cookie : hashCookieData,
                        status : 1,
                        expiredTime: time
                    })
                if (!cookie) {
                    throw new AccessDBError()
                }
            }

            const updateUser = await userService.update(
                { email: email},
                {
                    lastLoginTime: Date.now()
                })
            if (!updateUser) {
                throw new AccessDBError()
            }
            ctx.result = true
            ctx.message = 'Login success'
        }
    }
    return next()
}

module.exports = login