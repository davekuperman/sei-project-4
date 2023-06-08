const { validateJson } = require('./validateJson')

async function fetchRecipeFromLLM(ingredients) {
    const recipeSchema = {
        type: "object",
        properties: {
            recipeName: { type: "string" },
            ingredients: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        quantity: { type: "string" },
                        unit: { type: "string" }
                    },
                    required: ["name", "quantity", "unit"],
                    additionalProperties: false
                }
            },
            instructions: {
                type: "array",
                items: { type: "string" }
            },
            cookingTime: { type: "string" },
            servings: { type: "integer" }
        },
        required: ["recipeName", "ingredients", "instructions", "cookingTime", "servings"],
        additionalProperties: false
    }

    const promptText = `
        Please create a recipe using the following ingredients:
        ${ingredients.join(", ")}
        Provide the recipe details as a JSON object.
        The JSON object shall comply with the following schema:
        ${JSON.stringify(recipeSchema)}
    `

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptText }]
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.API_KEY
        },
        body: JSON.stringify(requestBody)
    });

    const responseBody = await response.json();
    console.log('response body:', responseBody)
    const recipeResponse = responseBody.choices[0].message.content || false;

    if (validateJson(JSON.parse(recipeResponse), recipeSchema)) {
        return recipeResponse;
    }

    return false;
}

module.exports = { fetchRecipeFromLLM };