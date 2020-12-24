const responseHandler = {}

responseHandler.normalHandler = async(ctx) => {
    if (ctx.result !== undefined) {
        ctx.type = 'json'
        ctx.body = {
            code: 200,
            message: ctx.message || '',
            data: ctx.result
        }
    }
}

responseHandler.errorHandler = async(ctx, next) => {
    return next().catch(err => {
        console.log(err)
        ctx.body = {
            code: err.code || -1,
            message: err.message.trim(),
            data: null
        }

        ctx.status = 200
        return Promise.resolve()
    })
}

module.exports = responseHandler