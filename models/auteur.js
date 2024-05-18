const mongoose = require('mongoose')

const AuteurSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    birthYear: {
        type: String,
        require: true
    },
    deathYear: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model('Auteur',AuteurSchema)