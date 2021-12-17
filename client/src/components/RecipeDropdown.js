import React from 'react';
import {useState, useEffect, useCallback} from 'react';



function RecipeDropdown({recipeID, onRecipeChange}) {

    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {
        await fetch('/recipes')
            .then((response) => response.json())
            .then((data) => setRecipes(data));

    };


    useEffect(() => {
        getRecipes();
    }, []);

    const changeRecipe = useCallback(

        e => {
            onRecipeChange(e.target.value)
        },
        [onRecipeChange]
    );

    const mapping = () => {
        if (recipes !== null) {
            return recipes.map((recipe) => (
                <option key = {recipe.recipeID} value={recipe.recipeID}>{recipe.recipeName}</option>
            ));
        };
    };

    return (
        <div>
            <label>Choose Recipe: </label>
            <select onChange={changeRecipe} val={recipeID}>
                <option>--Select Recipe--</option>
                {mapping()}
            </select>
        </div>
    )
}

export default RecipeDropdown