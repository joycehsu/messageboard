const request = require('supertest')
const app = require('../app')
const clearDB = require('./clearDB')

describe('Message Delete Child', () => {
    let user1Cookie = ''
    let user2Cookie = ''
    let message1Id = ''
    let message2Id = ''

    const user1 = {
        email: "message_user1@gmail.com",
        password: "123456"
    }
    const user2 = {
        email: "message_user2@gmail.com",
        password: "123456"
    }

    beforeAll( async() => {
        // await clearDB()
        console.log('//////Clear DB Done////////')

        const user1Sign = await request(app.callback()).post('/v1/account/signup').send(user1)
        const user1Login = await request(app.callback()).post('/v1/account/login').send(user1)
        user1Cookie = await user1Login.headers['set-cookie'].join(';')
        console.log(user1Cookie)

        const user2Sign = await request(app.callback()).post('/v1/account/signup').send(user2)
        const user2Login = await request(app.callback()).post('/v1/account/login').send(user2)
        user2Cookie = await user2Login.headers['set-cookie'].join(';')
        console.log(user2Cookie)
    })

    afterAll( async() => {
        await request(app.callback()).post('/v1/account/logout').set('cookie', user1Cookie)
        await request(app.callback()).post('/v1/account/logout').set('cookie', user2Cookie)
        // await clearDB()
    })

    describe('Go', () => {
        test('User1 Add message', async() => {
            let nowTime = new Date().toISOString()
            let date = nowTime.split('T')[0]
            let time = nowTime.split('T')[1].split(':')[0]+':'+nowTime.split('T')[1].split(':')[1]

            let message = await request(app.callback()).post('/v1/message').send({
                email: user1.email,
                messageTime: date + ' ' +time,
                content:'testMessage1'
            })
            .set('cookie', user1Cookie)
            expect(message.body.code).toBe(200)
            message1Id = message.body.data.messageId
        })
        test('User2 Replay message', async() => {
            let nowTime = new Date().toISOString()
            let date = nowTime.split('T')[0]
            let time = nowTime.split('T')[1].split(':')[0]+':'+nowTime.split('T')[1].split(':')[1]

            let message = await request(app.callback()).post('/v1/message').send({
                email: user2.email,
                messageTime: date + ' ' +time,
                content:'testMessage1-Replay',
                parentId: message1Id
            })
            .set('cookie', user2Cookie)
            expect(message.body.code).toBe(200)
            message2Id = message.body.data.messageId
        })
        test('User2 Delete Reply message', async() => {
            let deleteMsg = await request(app.callback()).post('/v1/message/delete').send({
                email: user2.email,
                parentId: message1Id,
                messageId: message2Id
            })
            .set('cookie', user2Cookie)
            expect(deleteMsg.body.code).toBe(200)
        })
    })
})