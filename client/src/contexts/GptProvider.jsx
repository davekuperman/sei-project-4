import { createContext, useState, useContext } from "react"

const RecipeContext = createContext({})

export const useRecipe = () => {
  return useContext(RecipeContext)
};

export const RecipeProvider = ({ children }) => {
  const [generatedRecipe, setGeneratedRecipe] = useState(null)
  const [savedRecipe, setSavedRecipe] = useState(null)

  const handleRecipeSaved = async (recipe) => {
    try {
      await saveRecipe(recipe);
      console.log("Recipe saved successfully")
    } catch (error) {
      console.log("Error saving recipe", error)
    }
  };

  const saveRecipe = async (recipe) => {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe }),
    });

    const savedRecipe = await response.json()
    return savedRecipe
  }

  const generateRecipe = async (ingredients) => {
    const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
    });

    const generateRecipe = await response.json()
    setGeneratedRecipe(generateRecipe)
    return generateRecipe
};

  return (
    <RecipeContext.Provider value={{ savedRecipe, handleRecipeSaved, generateRecipe, generatedRecipe, saveRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
