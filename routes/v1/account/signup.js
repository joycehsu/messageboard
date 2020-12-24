const router = require('koa-router')()
const signup = require('../../../controllers/signup')

router.prefix('/v1/account')

router.post('/signup', signup.signup)

module.exports = router