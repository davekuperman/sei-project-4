const express = require('express')
const asyncHandler = require('../middleware/async-handler')
const { getAllRecipes, createRecipe, getRecipesByUserId, getRecipeById } = require('../models/recipe')

const router = express.Router()

router.get('/', (req, res) => {
   return getAllRecipes().then((recipes) => {
      res.json(recipes)
   })
      .catch((error) => {
         res.status(500).json({ error: `Couldn't find any recipes` })
      })
})

router.get('/user', (req, res) => {
   console.log(req.session)
   const userId = req.session.user.id
   return getRecipesByUserId(userId).then((recipes) => {
      res.json(recipes)
   })
      .catch((error) => {
         res.status(500).json({ error: `Couldn't find any recipes` })
      })
})

router.get('/:id', (req, res) => {
   console.log(req.session)
   const recipeId = req.params.id
   return getRecipeById(recipeId)
      .then((recipe) => {
         if (recipe) {
            res.json(recipe)
         } else {
            res.status(404).json({ error: `Recipe not found` })
         }
      })
      .catch((error) => {
         res.status(500).json({ error: `Couldn't find the recipe` })
      })
})


router.post('/', asyncHandler(async (req, res) => {
   const recipeData = req.body
   const recipeId = await createRecipe(recipeData)
   res.status(201).json({ id: recipeId, message: 'Recipe created successfully' })
}))

module.exports = router