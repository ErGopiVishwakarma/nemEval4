const mongoose = require('mongoose')

const socialSchema = mongoose.Schema({
title:String,
body:String,
device:String,
postedBy:String 
})

const SocialModel = mongoose.model('social',socialSchema)

module.exports = SocialModel