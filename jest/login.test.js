const request = require('supertest')
const app = require('../app')

test("Login Success", async() => {
    const input = {
        email : "aabbcc1234@gmail.com",
        password: "123456abcdef"
    }
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(200)
    expect(login.body.message).toBe("Login success")
    expect(login.body.data).toBe(true)
})

test("Login - field[password] format is wrong", async() => {
    const input = {
        email : "aabbcc1234",
        password: "123"
    }
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Email format is wrong.")
})

test("Login - field[password] format is wrong", async() => {
    const input = {
        email : "aabbcc1234@gmail.com",
        password: "123"
    }
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Password format is wrong.")
})

test("Login - No Fields", async() => {
    const input = {}
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Need Email and password")
})

test("Login - Loss Field[password]", async() => {
    const input = {
        email : "aabbcc1234@gmail.com"
    }
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Need Email and password")
})

test("Login - Loss Field[password]", async() => {
    const input = {
        password : "1234567"
    }
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Need Email and password")
})

test("Login - Email(Account) is not exist", async() => {
    const input = {
        email: "Test@gmail.com",
        password : "1234567"
    }
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(401)
    expect(login.body.message).toBe("No register of the email was found.")
})

test("Login - Password value not correct", async() => {
    const input = {
        email: "Test_aabbcc1234@gmail.com",
        password : "1234567"
    }
    const login = await request(app.callback()).post('/v1/account/login').send(input)
    expect(login.body.code).toBe(403)
    expect(login.body.message).toBe("The password is not correct.")
})