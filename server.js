require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()
const mongoose= require('mongoose')

app.use(cors());


mongoose.connect(process.env.DATABASE_URL)
const db= mongoose.connection
db.on('error',(error)=> console.log(error))
db.once('open',()=> console.log('Connected to Database'))

app.use(express.json())

const livresRouter = require('./routes/livres')
app.use('/livres', livresRouter)

app.listen(3000,() =>console.log("Server Started") )