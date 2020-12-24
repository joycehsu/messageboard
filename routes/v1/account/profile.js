const router = require('koa-router')()
const profile = require('../../../controllers/profile')
const cookie = require('../../../middlewares/cookie')

router.prefix('/v1/account')

router.post('/profile', cookie.checkCookie, profile.set)

router.get('/profile', cookie.checkCookie, profile.get)

module.exports = router