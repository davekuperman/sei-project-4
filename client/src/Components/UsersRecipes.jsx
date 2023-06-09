import { Link, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthProvider"

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Text,
    Heading,
    List,
    ListItem,
    CloseButton,
  } from "@chakra-ui/react"

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

    const handleDeleteRecipe = async (recipeId) => {
        try {
            await fetch(`/api/recipes/${recipeId}`, {
                method: "DELETE",
            });
            // Remove the deleted recipe from the recipes state
            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe.id !== recipeId)
            );
            setSelectedRecipe(null)
        } catch (error) {
            console.log(error)
        }
    }

    if (!recipes) {
        return <p>Loading recipes...</p>
    }

    return (
        <>
            <Heading as="h1" size="xl" mb={4}>
        Your saved recipes
      </Heading>
      <Accordion allowMultiple>
        {recipes.map((recipe) => (
          <AccordionItem key={recipe.id}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {recipe.recipe_name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                <strong>{recipe.recipe_name}</strong>
              </Text>
              <Text mt={2} fontWeight="bold">
                Ingredients:
              </Text>
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    {ingredient.name}: {ingredient.quantity}
                  </ListItem>
                ))}
              </List>
              <Text mt={2} fontWeight="bold">
                Instructions:
              </Text>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
              <Text mt={2}>Cooking Time: {recipe.cooking_time}</Text>
              <Text>Servings: {recipe.servings}</Text>
              <Button
                mt={4}
                variant="outline"
                onClick={() => handleDeleteRecipe(recipe.id)}
              >
                Delete
              </Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
        </>
    );
};

export default UsersRecipes
