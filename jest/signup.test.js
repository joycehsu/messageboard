const request = require('supertest')
const app = require('../app')

test("Signup Success", async() => {
    const input = {
        email : "Test_aabbcc1234@gmail.com",
        password: "123456abcdef"
    }
    const login = await request(app.callback()).post('/v1/account/signup').send(input)
    expect(login.body.code).toEqual(200)
    expect(login.body.message).toBe("Create Account success")
})

test("Signup - field[password] format is wrong", async() => {
    const input = {
        email : "aabbcc1234",
        password: "123"
    }
    const login = await request(app.callback()).post('/v1/account/signup').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Email format is wrong.")
})

test("Signup - field[password] format is wrong", async() => {
    const input = {
        email : "aabbcc1234@gmail.com",
        password: "123"
    }
    const login = await request(app.callback()).post('/v1/account/signup').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Password format is wrong.")
})

test("Signup - No Fields", async() => {
    const input = {}
    const login = await request(app.callback()).post('/v1/account/signup').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Need Email and password")
})

test("Signup - Loss Field[password]", async() => {
    const input = {
        email : "aabbcc1234@gmail.com"
    }
    const login = await request(app.callback()).post('/v1/account/signup').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Need Email and password")
})

test("Signup - Loss Field[password]", async() => {
    const input = {
        password : "1234567"
    }
    const login = await request(app.callback()).post('/v1/account/signup').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("Need Email and password")
})

test("Signup - Email(Account) is exist", async() => {
    const input = {
        email : "aabbcc1234@gmail.com",
        password: "1234567"
    }
    const login = await request(app.callback()).post('/v1/account/signup').send(input)
    expect(login.body.code).toBe(400)
    expect(login.body.message).toBe("The Email is Exist.")
})