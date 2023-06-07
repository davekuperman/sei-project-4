const db = require("../db")

const getAllRecipes = () => {
  const query = `SELECT recipes.id, recipes.recipe_name, recipes.ingredients, recipes.instructions, recipes.cooking_time, recipes.servings,
      users.email as user_email, users.first_name as user_first_name, users.last_name as user_last_name
      FROM recipes
      INNER JOIN users ON recipes.user_id = users.id;`
  return db.query(query).then((res) => res.rows)
}

const getRecipesByUserId = (userId) => {
  console.log(`user id is`, userId)
  const query = `SELECT recipes.id, recipes.recipe_name, recipes.ingredients, recipes.instructions, recipes.cooking_time, recipes.servings,
      users.email as user_email, users.first_name as user_first_name, users.last_name as user_last_name
      FROM recipes
      INNER JOIN users ON recipes.user_id = users.id
      WHERE users.id = $1`

  return db.query(query, [userId]).then((res) => res.rows)
}

const getRecipeById = (id) => {
  const query = `SELECT recipes.id, recipes.recipe_name, recipes.ingredients, recipes.instructions, recipes.cooking_time, recipes.servings,
      users.email as user_email, users.first_name as user_first_name, users.last_name as user_last_name
      FROM recipes
      INNER JOIN users ON recipes.user_id = users.id
      WHERE recipes.id = $1`;

  return db.query(query, [id]).then((res) => res.rows[0]);
};

const createRecipe = (recipeData) => {
  const { user_id, recipe_name, ingredients, instructions, cooking_time, servings } = recipeData
  const query = `INSERT INTO recipes (user_id, recipe_name, ingredients, instructions, cooking_time, servings)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id`

  const values = [user_id, recipe_name, JSON.stringify(ingredients), JSON.stringify(instructions), cooking_time, servings]

  return db.query(query, values).then((res) => res.rows.id)
}

module.exports = { getAllRecipes, createRecipe, getRecipesByUserId, getRecipeById }