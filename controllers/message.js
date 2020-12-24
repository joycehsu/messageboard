const userService = require('../service/account')
const messageService = require('../service/message')
const replyMessageService = require('../service/reply_message')
const { UnauthorizedError, InvalidQueryError, AccessDBError } = require('../lib/error')

const message = {}
message.create = async (ctx, next) => {
    const {email, parentId, messageTime, content} = ctx.request.body

    if (!email || !messageTime || !content) {
        throw new InvalidQueryError()
    }

    const user = await userService.login({
        email: email
    })
    if (!user) {
        throw new UnauthorizedError('The email isn\'t exist')
    } else {
        let userId = user._id
        if (parentId === undefined) {
            const newMessage = await messageService.create({
                userId: userId,
                messageTime: messageTime,
                content: content,
                status: true
            })
            if (!newMessage) {
                throw new AccessDBError()
            } else {
                ctx.result = {
                    messageId: newMessage._id,
                    userId: userId,
                    messageTime: messageTime,
                    content: content
                }
                ctx.message = 'Create new message'
            }
        } else {
            const newReplyMessage = await replyMessageService.create({
                userId: userId,
                parentId: parentId,
                messageTime: messageTime,
                content: content,
                status: true
            })
            if (!newReplyMessage) {
                throw new AccessDBError()
            } else {
                ctx.result = {
                    messageId: newReplyMessage._id,
                    userId: userId,
                    messageTime: messageTime,
                    content: content
                }
                ctx.message = 'Create reply message'
            }
        }
    }
    return next()
}

message.delete = async (ctx, next) => {
    const {userIdbyCookie, messageId, parentId} = ctx.request.body
    if ( !userIdbyCookie || !messageId ){
        throw new InvalidQueryError()
    }

    if (parentId === undefined) {
        const updateMessage = await messageService.update(
            { 
                userId: userIdbyCookie,
                _id: messageId
            },
            { status: false})
        console.log(updateMessage)
        if (!updateMessage) {
            throw new AccessDBError()
        } else {
            const updateReplyMessage = await replyMessageService.update(
                {parentId: messageId},
                {status: false},
                true
            )
            if (!updateReplyMessage) {
                throw new AccessDBError()
            }
            console.log(updateReplyMessage)
            ctx.result = true
            ctx.message = 'Delete messages'
        }
    } else {
        const updateReplyMessage = await replyMessageService.update(
            {
                userId: userIdbyCookie,
                _id: messageId,
                parentId: parentId
            },
            {status: false})
        if (!updateReplyMessage) {
            throw new AccessDBError()
        }
        console.log(updateReplyMessage)
        ctx.result = true
        ctx.message = 'Delete reply message'
    }
    return next()
}

message.get = async (ctx, next) => {
    return next()
}

message.update = async (ctx, next) => {
    return next()
}

module.exports = message