const User = require('../models/index').getModel('user')
const Profile = require('../models/index').getModel('profile')
const Cookie = require('../models/index').getModel('cookie')
const MessageBoard = require('../models/index').getModel('message')
const replayMessageBoard = require('../models/index').getModel('reply_message')

const doClear = async() => {
    await User.deleteMany().then(function(){
        console.log("User deleted")
    }).catch(function(error){
        console.log(error)
    })

    await Profile.deleteMany().then(function(){
        console.log("Profile deleted")
    }).catch(function(error){
        console.log(error)
    })

    await Cookie.deleteMany().then(function(){
        console.log("Cookie deleted")
    }).catch(function(error){
        console.log(error)
    })

    await MessageBoard.deleteMany().then(function(){
        console.log("MessageBoard deleted")
    }).catch(function(error){
        console.log(error)
    })

    await replayMessageBoard.deleteMany().then(function(){
        console.log("replayMessageBoard deleted")
    }).catch(function(error){
        console.log(error)
    })
}

module.exports = doClear