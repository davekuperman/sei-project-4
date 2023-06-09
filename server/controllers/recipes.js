const express = require('express')
const asyncHandler = require('../middleware/async-handler')
const { getAllRecipes, createRecipe, getRecipesByUserId, getRecipeById, deleteRecipeById } = require('../models/recipe')
const { fetchRecipeFromLLM } = require('../models/fetchRecipe')
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
//get the recipe from database
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


router.post('/', async (req, res, next) => {
   try {
      // console.log('poopsicle:',res)
      const userId = req.session.user.id
      //console.log(userId)
      console.log(req.body)
      const ingredients = req.body.ingredients

      if (!ingredients) {
         const customError = new Error(" You need ingredients to create a recipe!")
         customError.status = 400
         return next(customError)
      }

      const recipeResponse = await fetchRecipeFromLLM(ingredients)
      const recipe = JSON.parse(recipeResponse)
      console.log('Your resulting recipe:', recipe)
      const recipeName = recipe.recipeName
      const recipeIngredients = recipe.ingredients
      const instructions = recipe.instructions
      const cookingTime = recipe.cookingTime
      const servings = recipe.servings

      const recipeResult = await createRecipe(userId, recipeName, recipeIngredients, instructions, cookingTime, servings)

      return res.status(200).json(recipe)

   } catch (error) {
      return next(error)
   }
})

// router.post('/', asyncHandler(async (req, res) => {
//    const recipeData = req.body
//    const recipeId = await createRecipe(recipeData)
//    res.status(201).json({ id: recipeId, message: 'Recipe created successfully' })
// }))

router.delete('/:id', asyncHandler(async (req, res) => {
   const recipeId = req.params.id
   await deleteRecipeById(recipeId)
   res.json({ message: 'Recipe deleted successfully' })
 }));

module.exports = router