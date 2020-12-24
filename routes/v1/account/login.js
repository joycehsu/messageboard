const router = require('koa-router')()
const login = require('../../../controllers/login')

router.prefix('/v1/account')

router.post('/login', login.login)

module.exports = router