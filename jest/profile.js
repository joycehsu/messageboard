const request = require('supertest')
const app = require('../app')

let user = {
    email : "Test_aabbcc1234@gmail.com",
    password: "123456abcdef"
}

// let cookie = ''
// beforeAll((done) => {
//     request(app.callback()).post('/v1/account/login').send(user).end((err, response) => {
//         // cookie = response.header["set-cookie"][0].split(';')[0].split('=')[1]
//         cookie = response.header["set-cookie"]
//         done()
//     })
// })

test('Get Profile Success', async done =>{
    let cookie = ''
    request(app.callback()).post('/v1/account/login').send(user).end((err, response) => {
        // cookie = response.header["set-cookie"][0].split(';')[0].split('=')[1]
        cookie = response.header["set-cookie"]
        done()
    })
    this.cookie = cookie
    const profile = await request(app.callback()).get('/v1/account/profile')
    console.log(profile.body)
    expect(profile.body.code).toBe(200)
})