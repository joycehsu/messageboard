const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const dbconfig = require('../config/mongoDB')

let url = 'mongodb://' + dbconfig.host + ":" + dbconfig.port + "/" + dbconfig.database
var mongo = mongoose.createConnection(url, {useFindAndModify: false})

let db = {
    mongo: mongo,
    models: {}
}

fs.readdirSync(__dirname).filter(function(file){
    return (file.indexOf(".") !== 0) && (file != "index.js")
}).forEach(function (file){
    var modelFile = require(path.join(__dirname, file))
    var schema = new mongoose.Schema(modelFile.schema)

    db.models[modelFile.name] = mongo.model(modelFile.name, schema, modelFile.name)
    console.log(modelFile.name)
})

db.getModel = function(modelName){
    return this.models[modelName]
}

module.exports = db