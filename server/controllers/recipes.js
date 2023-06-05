const express = require('express')
const { getAllRecipes } = require('../models/recipe')

const router = express.Router()

router.get('/',(req,res) => {
   return getAllRecipes().then((recipes)=>{
    res.json(recipes)
   })
   .catch((error) =>{
    res.status(500).json({ error: `Couldn't find any recipes`})
   })
})

module.exports = router