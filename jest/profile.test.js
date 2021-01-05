const request = require('supertest')
const app = require('../app')
const fs = require('fs')
const clearDB = require('./clearDB')

describe("Profile", () => {
    let userCookie = ''

    const user = {
        email: 'profile_user@gmail.com',
        password: '123456'
    }
    const correctData = {
        name: 'JoJo',
        nickName: 'Jo',
        gender: 1,
        birthday: '1999-01-01'
    }

    const wrongGenderData = {
        gender: 4
    }

    const wrongBDayData = {
        birthday: '1999-31-01'
    }

    beforeAll( async() => {
        // await clearDB()
        const userSign = await request(app.callback()).post('/v1/account/signup').send(user)
        const userLogin = await request(app.callback()).post('/v1/account/login').send(user)
        userCookie = await userLogin.headers['set-cookie'].join(';')
    })

    afterAll( async() => {
        await request(app.callback()).post('/v1/account/logout').set('cookie', userCookie)
        // await clearDB()
    })

    describe("Go", () => {
        test('Success - [GET] Profile', async() => {
            let profile = await request(app.callback()).get('/v1/account/profile').set('cookie', userCookie)
            expect(profile.body.code).toBe(200)
        })
        test('Fail - [GET] Profile with No Cookie', async() => {
            let profile = await request(app.callback()).get('/v1/account/profile')
            expect(profile.body.code).toBe(403)
        })
        test('Success - [POST] Profile', async() => {
            let profile = await request(app.callback()).post('/v1/account/profile').send(correctData).set('cookie', userCookie)
            expect(profile.body.code).toBe(200)
            expect(profile.body.data.name).toEqual(correctData.name)
            expect(profile.body.data.nickName).toEqual(correctData.nickName)
            expect(profile.body.data.gender).toEqual(correctData.gender)
            expect(profile.body.data.birthday).toEqual(correctData.birthday)
        })
        test('Fail - [POST] [gender] format is wrong', async() => {
            let profile = await request(app.callback()).post('/v1/account/profile').send(wrongGenderData).set('cookie', userCookie)
            expect(profile.body.code).toBe(400)
        })
        test('Fail - [POST] [birthday] format is wrong', async() => {
            let profile = await request(app.callback()).post('/v1/account/profile').send(wrongGenderData).set('cookie', userCookie)
            expect(profile.body.code).toBe(400)
        })
        describe('Upload endpoint', () => {
            let filepath = `${__dirname}/test.png`
            test('Successfully uploads jpg image', async(done) => {
                const profile = await request(app.callback())
                    .post('/v1/account/profile')
                    .set('cookie', userCookie)
                    .set('content-type', 'application/octet-stream')
        
                const imgStream = fs.createReadStream(filepath);
                imgStream.on('end', () => profile.end(done));
                imgStream.pipe(profile, {end: false})
        
                expect(profile.body.code).toBe(200)
                expect(profile.body.data.name).toEqual(correctData.name)
                expect(profile.body.data.nickName).toEqual(correctData.nickName)
                expect(profile.body.data.gender).toEqual(correctData.gender)
                expect(profile.body.data.birthday).toEqual(correctData.birthday)
                // headshot path
                done()
            })
        })
    })
})