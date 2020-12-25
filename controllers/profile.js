const fs = require('fs')
const path = require('path')
const profileService = require('../service/profile')
const regularExp = require('../lib/regular_exp')
const { AccessDBError, FileSystemError, InvalidQueryError } = require('../lib/error')

const profile = {}
profile.set = async (ctx, next) => {
    const {userIdbyCookie, name, nickName, birthday, gender} = ctx.request.body
    if (!userIdbyCookie) {
        throw new InvalidQueryError()
    }

    var updateData = {}
    if (name) updateData['name'] = name
    if (nickName) updateData['nickName'] = nickName
    if (birthday) updateData['birthday'] = new Date(birthday)
    if (gender) updateData['gender'] = gender

    const dirPath = path.join(appRoot, '/upload', userIdbyCookie)
    var fileReader = {}
    var writeStream = {}
    var file = {}
    var filePath = null
    if (ctx.request.files !== undefined) {
        const file = ctx.request.files.file
        fileReader = fs.createReadStream(file.path)
        // TODO: rename (!?)
        filePath = dirPath + `/${file.name}`
        writeStream = fs.createWriteStream(filePath)
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, (err) => {
                if (err) {
                    throw new FileSystemError()
                } else {
                    fileReader.pipe(writeStream)
                    updateData['headShot'] = filePath
                }
            })
        } else {
            fileReader.pipe(writeStream)
            updateData['headShot'] = filePath
        }
    }

    const profileExist = await profileService.check({
        userId: userIdbyCookie
    })
    if (!profileExist) {
        const profileCreate = await profileService.create(updateData)
        if (!profileCreate) {
            throw new AccessDBError()
        } else {
            var profileData = await profileService.check({
                userId: userIdbyCookie
            })
            if (!profileData) {
                throw new AccessDBError()
            } else {
                ctx.result = {
                    name: profileData.name,
                    nickName: profileData.nickName,
                    birthday: new Date(profileData.birthday).toISOString().split('T')[0],
                    gender: profileData.gender,
                    headShot: profileData.headShot
                }
                ctx.message = 'Create profile Success'
            }
        }
    } else {
        updateData['updateTime'] = new Date().toISOString()
        const profileUpdate = await profileService.update(
            {userId: userIdbyCookie}, updateData)
        if (!profileUpdate) {
            throw new AccessDBError()
        } else {
            var profileData = await profileService.check({
                userId: userIdbyCookie
            })
            if (!profileData) {
                throw new AccessDBError()
            } else {
                ctx.result = {
                    name: profileData.name,
                    nickName: profileData.nickName,
                    birthday: new Date(profileData.birthday).toISOString().split('T')[0],
                    gender: profileData.gender,
                    headShot: profileData.headShot
                }
                ctx.message = 'Update profile Success'
            }
        }
    }
    return next()
}

profile.get = async (ctx, next) => {
    const {userIdbyCookie} = ctx.request.body
    const profileData = await profileService.check({
        userId: userIdbyCookie
    })
    if (!profileData) {
        throw new AccessDBError()
    } else {
        ctx.result = {
            name: profileData.name,
            nickName: profileData.nickName,
            birthday: new Date(profileData.birthday).toISOString().split('T')[0],
            gender: profileData.gender,
            headShot: profileData.headShot
        }
        ctx.message = 'Get profile'
    }
    return next()
}

module.exports = profile
