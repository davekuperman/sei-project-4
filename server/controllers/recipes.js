const express = require('express')
const asyncHandler = require('../middleware/async-handler')
const { getAllRecipes, createRecipe } = require('../models/recipe')

const router = express.Router()

router.get('/',(req,res) => {
   return getAllRecipes().then((recipes)=>{
    res.json(recipes)
   })
   .catch((error) =>{
    res.status(500).json({ error: `Couldn't find any recipes`})
   })
})

router.post('/', asyncHandler(async (req, res) => {
   const recipeData = req.body
   const recipeId = await createRecipe(recipeData)
   res.status(201).json({ id: recipeId, message: 'Recipe created successfully' })
 }))

module.exports = router