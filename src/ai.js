import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`

// Check if the API key exists
const apiKey = import.meta.env.VITE_HUGGING_FACE_API_KEY
if (!apiKey) {
  console.error('API key is missing! Make sure VITE_HUGGING_FACE_API_KEY is set in your .env file')
}

// Initialize the HfInference with the API key
const hf = new HfInference(apiKey)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        console.log('Using API key:', apiKey.substring(0, 5) + '...') // Log partial key for debugging
        
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        // More detailed error logging
        console.error('API Error:', err.message)
        if (err.response) {
            console.error('Response data:', err.response.data)
            console.error('Response status:', err.response.status)
        }
        return `Error: ${err.message}. Please check your API key.`
    }
}