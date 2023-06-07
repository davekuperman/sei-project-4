import { Link, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { useAuth } from "../contexts/AuthProvider"

const UsersRecipes = () => {

    const { user } = useAuth()

    const [recipes, setRecipes] = useState(null)
    const [selectedRecipe, setSelectedRecipe] = useState(null)

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log(user)
                const res = await fetch(`/api/recipes/user`)
                const data = await res.json()
                console.log(data)
                setRecipes(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRecipes()
    }, [])

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe)
    }

    if (!recipes) {
        return <p>Loading recipes...</p>
    }

    return (
        <>
             <h1>Your saved recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <button onClick={() => handleRecipeClick(recipe)}>
            {recipe.recipe_name}
          </button>
          {selectedRecipe && selectedRecipe.id === recipe.id && (
            <div>
              <h2>{selectedRecipe.recipe_name}</h2>
              <h3>Ingredients:</h3>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name}: {ingredient.quantity}
                  </li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <ol>
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
              <p>Cooking Time: {selectedRecipe.cooking_time}</p>
              <p>Servings: {selectedRecipe.servings}</p>
              <button onClick={() => setSelectedRecipe(null)}>Close</button>
            </div>
          )}
        </div>
      ))}
        </>
    );
};

export default UsersRecipes
