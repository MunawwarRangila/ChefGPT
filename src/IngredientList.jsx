export default function IngredientList(props){
    const list = props.ingredients.map((item)=>{
        return (
            <li key={item}>{item}</li>
        )
    })
    return(
        <section>
            <div className="list-section">
                {list.length > 0 ? <h2>Ingredients on hand:</h2> : null}
                <ul className="ingredients-list" aria-live="polite">{list}</ul>
            </div>
            <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>
        </section>
    )
}