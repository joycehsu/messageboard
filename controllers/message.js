const userService = require('../service/account')
const messageService = require('../service/message')
const replyMessageService = require('../service/reply_message')
const { UnauthorizedError, InvalidQueryError, AccessDBError, ForbiddenError } = require('../lib/error')

const message = {}
message.create = async (ctx, next) => {
    const {userIdbyCookie, email, parentId, messageTime, content} = ctx.request.body

    if (!email || !messageTime || !content) {
        throw new InvalidQueryError()
    }

    const user = await userService.findById(userIdbyCookie)
    if (!user) {
        throw new UnauthorizedError('The email isn\'t exist')
    } else {
        let userId = user._id
        if (user.email != email) {
            throw new ForbiddenError('This is not your message')
        }
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
            try {
                const parentExist = await messageService.findById(parentId)
                if (!parentExist) {
                    throw new AccessDBError()
                }
            } catch{
                throw new AccessDBError()
            }
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
        const theMessage = await messageService.findById(messageId)
        if (!theMessage) {
            throw new AccessDBError()
        } else {
            if (theMessage.userId === userIdbyCookie) {
                const updateMessage = await messageService.update(
                    { _id: messageId},
                    { status: false})
                if (!updateMessage) {
                    throw new AccessDBError()
                }
                else {
                    const updateReplyMessage = await replyMessageService.update(
                        {parentId: messageId},
                        {status: false},
                        true
                    )
                    if (!updateReplyMessage) {
                        throw new AccessDBError()
                    }
                    ctx.result = true
                    ctx.message = 'Delete messages'
                }
            } else {
                throw new ForbiddenError('This is not you message')
            }
        }
    } else {
        const theMessage = await replyMessageService.findById(messageId)
        if (!theMessage) {
            throw new AccessDBError()
        } else {
            if (theMessage.userId === userIdbyCookie) {
                const updateReplyMessage = await replyMessageService.update(
                    {
                        _id: messageId,
                        parentId: parentId
                    },
                    {status: false})
                if (!updateReplyMessage) {
                    throw new AccessDBError()
                }
                if (updateReplyMessage.nModified === 0){
                    throw new InvalidQueryError('Cannot find the message.')
                }
                ctx.result = true
                ctx.message = 'Delete reply message'
            } else {
                throw new ForbiddenError('This is not you message')
            }
        }
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
