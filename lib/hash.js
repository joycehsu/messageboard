const crypto = require('crypto')

async function hash(data) {
    return crypto.createHash('sha1').update(data).digest('hex')
}

module.exports = hash