const router = require('koa-router')()
const logout = require('./../../../controllers/logout')
const cookie = require('../../../middlewares/cookie')

router.prefix('/v1/account')

router.post('/logout', cookie.checkCookie, logout.logout)

module.exports = router