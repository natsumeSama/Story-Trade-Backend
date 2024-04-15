const express = require('express')
const router = express.Router()
const Livre = require('../models/livre')

//Get all books
router.get('/',async (req,res) => {
    try {
        const livres = await Livre.find()
        res.json(livres)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Create a book
router.post('/',async (req,res)=>{
    const livre = new Livre({
        title : req.body.title,
        author : req.body.author,
        editor : req.body.editor,
        description : req.body.description
    })

    try {
        const newlivre = await livre.save()
        res.status(201).json({message:"new livre"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports= router