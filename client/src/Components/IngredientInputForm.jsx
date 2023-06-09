import { useState } from "react";

const IngredientInputForm = ({ onFormSubmit, onRecipeGenerated }) => {
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [generatedRecipe, setGeneratedRecipe] = useState("")

    const handleIngredientChange = (e) => {
        setIngredient(e.target.value);
    };

    const handleAddIngredient = () => {
        if (ingredient.trim() !== "") {
            setIngredientsList([...ingredientsList, ingredient.trim()]);
            setIngredient("");
        }
    };

    const handleRemoveIngredient = (index) => {
        setIngredientsList((prevList) =>
            prevList.filter((_, i) => i !== index)
        );
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        onFormSubmit(ingredientsList)
        const recipe = await generateRecipe(ingredientsList)
        onRecipeGenerated(recipe)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          handleAddIngredient()
        }
      }
    

    const generateRecipe = async (ingredients) => {
        const response = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients }),
        });

        const recipe = await response.json()
        return recipe
    };

    return (
        <div>
            <h2>Enter Available Ingredients</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter an ingredient"
                    value={ingredient}
                    onChange={handleIngredientChange}
                    onKeyPress={handleKeyPress}
                />
                <button type="button" onClick={handleAddIngredient}>
                    Add Ingredient
                </button>
                <ul>
                    {ingredientsList.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient}
                            <button
                                type="button"
                                onClick={() => handleRemoveIngredient(index)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <button type="submit">Generate Recipe</button>
            </form>
            {generatedRecipe && (
        <div>
        <h3>Generated Recipe:</h3>
        <h4>Name: {generatedRecipe.recipe_name}</h4>
        <h4>Ingredients:</h4>
        <ul>
          {generatedRecipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}: {ingredient.quantity}
            </li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <ol>
          {generatedRecipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        <h4>Cooking Time: {generatedRecipe.cooking_time}</h4>
        <h4>Servings: {generatedRecipe.servings}</h4>
        <button>Save Recipe</button>
      </div>
            )}
        </div>
    );
};

export default IngredientInputForm;