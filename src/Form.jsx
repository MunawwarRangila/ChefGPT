import React from 'react'
import './index.css'
import Recipe from './Recipe.jsx'
import IngredientList from './IngredientList.jsx'
import {getRecipeFromMistral } from './ai.js'

export default function Form(){
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [inputError, setInputError] = React.useState(false)
    
        
    async function getRecipe(){
        setLoading(true)
        setError(null)
        try {
            const generatedResponse = await getRecipeFromMistral(ingredients)
            console.log(generatedResponse)
            if (generatedResponse && !generatedResponse.startsWith('Error:')) {
                setRecipe(generatedResponse)
            } else {
                setError('Failed to generate recipe. Please try again.')
            }

        } catch (err) {
            console.error('Error in getRecipe:', err)
            setError('An error occurred. Please try again.')
        } finally  {
            setLoading(false)
        }
    }

    

    function handleSubmit(formData){
        const newItem = formData.get("ingredients")
        // Only add the ingredient if it's not empty or just whitespace
        if (newItem && newItem.trim() !== '') {
            setIngredients((prev)=>[...prev, newItem.trim()])
            setInputError(false) // Clear any previous error
        } else {
            setInputError(true) // Set error state to true
        }
    }

    return (
        <main className="main">
            
            

            <form className='form' action={handleSubmit}>
                <input 
                    type='text' 
                    id='ingredients' 
                    name='ingredients' 
                    placeholder="e.g. Oregano" 
                    className={inputError ? 'error-input' : ''}
                    onChange={() => setInputError(false)} // Clear error when user starts typing
                />
                <button>Add Ingredients</button>
            </form>

            <IngredientList ingredients={ingredients} getRecipe={getRecipe} />  
           <div className='suggested-recipe-container '>
                {loading ? <p>Generating recipe...</p> : null}
                {error ? <p className="error">{error}</p> : null}
                {recipe ? <Recipe recipeContent={recipe} /> : null}
            </div>
        </main>
    )
}