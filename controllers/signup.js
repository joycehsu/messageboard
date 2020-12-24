const userService = require('../service/account')
const profileService = require('../service/profile')
const regularExp = require('../lib/regular_exp')
const { InvalidQueryError, AccessDBError } = require('../lib/error')
const hash = require('../lib/hash')

const signup = {}
signup.signup = async (ctx, next) => {
    const {email, password} = ctx.request.body
    if (!email || !password){
        throw new InvalidQueryError('Need Email and password')
    }

    // verify_email = await regularExp.email(email)
    // verify_password = await regularExp.password(password)
    // if (!verify_email || !verify_password) {
    //     throw new InvalidQueryError('The Email or password format is wrong.')
    // }

    const exist = await userService.login({
        email: email
    })
    if (exist) {
        // TODO: redirect to login page
        throw new InvalidQueryError('The Email is Exist.')
    }

    hashPassword = await hash(password)
    const user = await userService.signup({
        email: email,
        password: hashPassword
    })
    const profile = await profileService.create({
        userId: user._id
    })

    if (!user || !profile) {
        // TODO: if any create is success, need redo
        throw new AccessDBError('Create Account Fail')
    } else {
        ctx.result = {
            userId: user._id
        }
        ctx.message = 'Create Account success'
    }
    return next()
}

module.exports = signup