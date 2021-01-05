const request = require('supertest')
const app = require('../app')
const clearDB = require('./clearDB')

describe('Account Login', () => {
    let userCookie = ''
    const correctUser = {
        email: "login_user@gmail.com",
        password: "123456"
    }

    const unExistUser = {
        email: "login_haha@gmail.com",
        password: "123456"
    }

    const wrongPasswordUser = {
        email: "login_user@gmail.com",
        password: "111111"
    }

    beforeAll( async() => {
        // await clearDB()
        const userSign = await request(app.callback()).post('/v1/account/signup').send(correctUser)
    })

    afterAll( async() => {
        await request(app.callback()).post('/v1/account/logout').set('cookie', userCookie)
        // await clearDB()
    })

    describe('Go', () => {
        test("Success", async() => {
            const login = await request(app.callback()).post('/v1/account/login').send(correctUser)
            expect(login.body.code).toBe(200)
            expect(login.body.message).toBe("Login success")
            expect(login.body.data).toBe(true)
            userCookie = await login.headers['set-cookie'].join(';')
        })
        test("Fail - Email(Account) is not exist", async() => {
            const login = await request(app.callback()).post('/v1/account/login').send(unExistUser)
            expect(login.body.code).toBe(401)
            expect(login.body.message).toBe("No register of the email was found.")
        })
        test("Fail - Password value is not correct", async() => {
            const login = await request(app.callback()).post('/v1/account/login').send(wrongPasswordUser)
            expect(login.body.code).toBe(403)
            expect(login.body.message).toBe("The password is not correct.")
        })
    })
})
