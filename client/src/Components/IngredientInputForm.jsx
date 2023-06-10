import { useState } from "react";
import { useRecipe } from "../contexts/GptProvider";
import {
    Box,
    Heading,
    Text,
    Input,
    Button,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";

const IngredientInputForm = () => {
    const { generateRecipe, generatedRecipe } = useRecipe ()
    console.log(generatedRecipe)
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    

    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const ingredients = ingredientsList
        try{
            await generateRecipe(ingredients)

        } catch(err){
            console.log(err)
        }
    }

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

    
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddIngredient()
        }
    }
    

    return (
        <div>
            <Heading as="h2" mb={4}>
                Enter Available Ingredients
            </Heading>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Enter an ingredient"
                    value={ingredient}
                    onChange={handleIngredientChange}
                    onKeyPress={handleKeyPress}
                    mb={4}
                />
                <Button onClick={handleAddIngredient} mb={4}>
                    Add Ingredient
                </Button>
                <UnorderedList>
                    {ingredientsList.map((ingredient, index) => (
                        <ListItem key={index} mb={2}>
                            {ingredient}
                            <Button
                                onClick={() => handleRemoveIngredient(index)}
                                ml={2}
                                size="sm"
                                variant="outline"
                            >
                                Remove
                            </Button>
                        </ListItem>
                    ))}
                </UnorderedList>
                <Button type="submit" colorScheme="blue" mt={4}>
                    Generate Recipe
                </Button>
            </form>
            {generatedRecipe && (
                <Box mt={4}>
                    <Heading as="h3" mb={2}>
                        Generated Recipe:
                    </Heading>
                    <Text as="h4" mb={2} color="darkgreen" fontWeight="bold" >
                        {generatedRecipe.recipeName}
                    </Text>
                    <Text as="h4" mb={2} color="darkred">
                        Ingredients:
                    </Text>
                    <UnorderedList mb={2} >
                        {generatedRecipe.ingredients.map((ingredient, index) => (
                            <ListItem key={index} color="black" >
                                {ingredient.name}: {ingredient.quantity}
                            </ListItem>
                        ))}
                    </UnorderedList>
                    <Text as="h4" mb={2} color="darkred" fontWeight="bold"  > 
                        Instructions:
                    </Text>
                    <ol color="orange">
                        {generatedRecipe.instructions.map((instruction, index) => (
                            <li key={index} >{instruction}</li>
                        ))}
                    </ol>
                    <Text as="h4" mb={2}>
                        Cooking Time: {generatedRecipe.cooking_time}
                    </Text>
                    <Text as="h4" mb={2} color="chocolate">
                        Servings: {generatedRecipe.servings}
                    </Text>
                    <Button colorScheme="blue">Save Recipe</Button>
                </Box>
            )}
        </div>
    );
};

export default IngredientInputForm;