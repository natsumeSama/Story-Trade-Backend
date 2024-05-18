const express = require('express')
const router = express.Router()
const Auteur = require('../models/auteur')

//Get all authors
router.get('/',async (req,res) => {
    try {
        const auteurs = await Auteur.find()
        res.json(auteurs)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get an author
router.get('/search', async (req, res) => {
    const { nom } = req.query;
    if (!nom) {
        return res.status(400).json({ message: 'Le nom est requis' });
    }
    
    try {
        const auteurs = await Auteur.find({ fullName: new RegExp(nom, 'i') });  // 'i' pour insensible à la casse
        res.json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Create an author
router.post('/',async (req,res)=>{
    const auteur = new Auteur({
        fullName : req.body.fullName,
        country : req.body.country,
        birthYear : req.body.birthYear,
        deathYear : req.body.deathYear,
        picture : req.body.picture
    })

    try {
        const newauteur = await auteur.save()
        res.status(201).json({message:"new auteur"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


// Delete all authors
router.delete('/deleteAll', async (req, res) => {
    try {
        await Auteur.deleteMany();
        res.json({ message: 'Tous les auteurs ont été supprimés' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Delete an author
router.delete('/delete', async (req, res) => {
    const { nom } = req.query;
    if (!nom) {
        return res.status(400).json({ message: 'Le nom est requis' });
    }

    try {
        const deletedAuteur = await Auteur.findOneAndDelete({ fullName: new RegExp(nom, 'i') });  // 'i' pour insensible à la casse
        if (!deletedAuteur) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.json({ message: 'Auteur supprimé'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports= router