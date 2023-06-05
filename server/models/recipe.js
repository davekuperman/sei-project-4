const db = require("../db")

const getAllRecipes = () => {
    const query = `SELECT recipes.id, recipes.recipe_name, recipes.ingredients, recipes.instructions, recipes.cooking_time, recipes.servings,
      users.email as user_email, users.first_name as user_first_name, users.last_name as user_last_name
      FROM recipes
      INNER JOIN users ON recipes.user_id = users.id;`
    return db.query(query).then((res) => res.rows);
}

module.exports = { getAllRecipes }