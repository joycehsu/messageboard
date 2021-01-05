const request = require('supertest')
const app = require('../app')
const clearDB = require('./clearDB')

describe("Account Signup", () => {
    const correctUser = {
        email: "signup_user@gmail.com",
        password: "123456"
    }

    const wrongEmailUser = {
        email: "signup_user",
        password: "123456"
    }

    const wrongPasswordUser = {
        email: "signup_user@gmail.com",
        password: "123"
    }

    const lossEmailUser = {
        password: "123456"
    }

    const lossPasswordUser = {
        email: "signup_user@gmail.com"
    }

    beforeAll( async()=>{
        await clearDB()
    })

    afterAll(() => {
        // await clearDB()
    })

    describe("Go", () => {
        test("Success", async() => {
            const signup = await request(app.callback()).post('/v1/account/signup').send(correctUser)
            expect(signup.body.code).toBe(200)
            expect(signup.body.message).toBe("Create Account success")
        })
        test("Fail - No field", async() => {
            const signup = await request(app.callback()).post('/v1/account/signup').send({})
            expect(signup.body.code).toBe(400)
            expect(signup.body.message).toBe("Need Email and password")
        })
        test("Fail - Loss [email]", async() => {
            const signup = await request(app.callback()).post('/v1/account/signup').send(lossEmailUser)
            expect(signup.body.code).toBe(400)
            expect(signup.body.message).toBe("Need Email and password")
        })
        test("Fail - Loss [passowrd]", async() => {
            const signup = await request(app.callback()).post('/v1/account/signup').send(lossPasswordUser)
            expect(signup.body.code).toBe(400)
            expect(signup.body.message).toBe("Need Email and password")
        })
        test("Fail - [pmail] format is wrong", async() => {
            const signup = await request(app.callback()).post('/v1/account/signup').send(wrongEmailUser)
            expect(signup.body.code).toBe(400)
            expect(signup.body.message).toBe("Email format is wrong.")
        })
        test("Fail - [password] format is wrong", async() => {
            const signup = await request(app.callback()).post('/v1/account/signup').send(wrongPasswordUser)
            expect(signup.body.code).toBe(400)
            expect(signup.body.message).toBe("Password format is wrong.")
        })
        test("Fail - Email(Account) is exist", async() => {
            const signup = await request(app.callback()).post('/v1/account/signup').send(correctUser)
            expect(signup.body.code).toBe(400)
            expect(signup.body.message).toBe("The Email is Exist.")
        })
    })
})
