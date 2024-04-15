const mongoose = require('mongoose')

const livreSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    editor: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Livre',livreSchema)