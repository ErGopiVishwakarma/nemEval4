const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(`mongodb+srv://gopi:gopialpha@cluster0.ge7c9ga.mongodb.net/social?retryWrites=true&w=majority`)

module.exports = connection 