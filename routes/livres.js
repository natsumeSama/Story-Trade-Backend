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

//Get a book
router.get('/search', async (req, res) => {
    const { titre } = req.query;
    if (!titre) {
        return res.status(400).json({ message: 'Le titre est requis' });
    }
    
    try {
        const livres = await Livre.find({ title: new RegExp(titre, 'i') });  // 'i' pour insensible à la casse
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Create a book
router.post('/',async (req,res)=>{
    const livre = new Livre({
        title : req.body.title,
        author : req.body.author,
        editor : req.body.editor,
        description : req.body.description,
        picture : req.body.picture
    })

    try {
        const newlivre = await livre.save()
        res.status(201).json({message:"new livre"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


// Delete all books
router.delete('/deleteAll', async (req, res) => {
    try {
        await Livre.deleteMany();
        res.json({ message: 'Tous les livres ont été supprimés' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Delete a book
router.delete('/delete', async (req, res) => {
    const { titre } = req.query;
    if (!titre) {
        return res.status(400).json({ message: 'Le titre est requis' });
    }

    try {
        const deletedLivre = await Livre.findOneAndDelete({ title: new RegExp(titre, 'i') });  // 'i' pour insensible à la casse
        if (!deletedLivre) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.json({ message: 'Livre supprimé'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports= router