import React from 'react';


function Recipe ({recipe, onEdit, deleteRecipe}) {
    return (
        <tr>
            <td>{recipe.recipeName}</td>
            <td>{recipe.ingredients}</td>
            <td>{recipe.instruction}</td>
            <td>{recipe.calorieCount}</td>
            <td><button class='btn btn-outline-dark' onClick={() => onEdit(recipe)}>Edit</button></td>
            <td><button class='btn btn-outline-dark' onClick={() => deleteRecipe(recipe.recipeID)}>Delete</button></td>
        </tr>
    )
}

export default Recipe