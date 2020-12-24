const router = require('koa-router')()
const message = require('../../../controllers/message')
const cookie = require('../../../middlewares/cookie')

router.prefix('/v1/message')

router.post('/', cookie.checkCookie, message.create)

router.delete('/', cookie.checkCookie, message.delete)

router.get('/', cookie.checkCookie, message.get)

module.exports = router