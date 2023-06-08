import { useState } from "react";

const IngredientInputForm = ({ onFormSubmit }) => {
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

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(ingredientsList)
        generateRecipe(ingredientsList)
    }

    const generateRecipe = async (ingredients) => {
        const response = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients }),
        });

        const recipe = await response.json();
        onRecipeGenerated(recipe);
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
                    <pre>{JSON.stringify(generatedRecipe, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default IngredientInputForm;