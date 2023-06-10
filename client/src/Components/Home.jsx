import { useAuth } from "../contexts/AuthProvider"
import { useRecipe } from "../contexts/GptProvider"
import { useState } from "react"
import {
    Box,
    Text,
    VStack,
} from "@chakra-ui/react"
import IngredientInputForm from "../Components/IngredientInputForm"

const Home = () => {
    const { user } = useAuth()
    const { savedRecipe, handleRecipeSaved, generateRecipe } = useRecipe()
    const [loading, setLoading] = useState(false)
    const [generatedRecipe, setGeneratedRecipe] = useState(null)



    const handleFormSubmit = async (ingredients) => {
        try {
            setLoading(true)
            const recipe = await generateRecipe(ingredients)
            setGeneratedRecipe(recipe)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (
        <Box>
            <Text>Welcome back {user?.first_name}</Text>
            <IngredientInputForm
                onFormSubmit={handleFormSubmit}
                onRecipeGenerated={setGeneratedRecipe}
            />

            {loading && <Loading />}
            {generatedRecipe && (
                <GeneratedRecipe
                    recipe={generatedRecipe}
                    onSaveRecipe={handleRecipeSaved}
                    onGenerateAnotherRecipe={() => setGeneratedRecipe(null)}
                />
            )}
        </Box>
    )
}

export default Home;