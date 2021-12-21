import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import MealTypesRadio from "../components/MealTypesRadio";
import MealPlannerNavbar from "../components/Navbar";

function EditRecipe({ recipeToEdit }) {

    const savedRecipeID = Number(localStorage.getItem('savedRecipeID'));
    const savedRecipeName = localStorage.getItem('savedRecipeName');
    const savedInstruction = localStorage.getItem('savedInstruction');
    const savedIngredients = localStorage.getItem('savedIngredients');
    const savedCalorieCount = localStorage.getItem('savedCalorieCount');
    const savedUserID = Number(localStorage.getItem('savedUserID'));
    const savedTypeID = Number(localStorage.getItem('savedTypeID'));

    const [recipeName, setRecipeName] = useState(recipeToEdit ? recipeToEdit.recipeName : savedRecipeName);
    const [ingredients, setIngredients] = useState(recipeToEdit ? recipeToEdit.ingredients : savedIngredients);
    const [instruction, setInstruction] = useState(recipeToEdit ? recipeToEdit.instruction : savedInstruction);
    const [calorieCount, setCalorieCount] = useState(recipeToEdit ? recipeToEdit.calorieCount : savedCalorieCount);
    const [userID] = useState(recipeToEdit ? recipeToEdit.userID : savedUserID);
    const [typeID, setTypeID] = useState(recipeToEdit ? recipeToEdit.typeID : savedTypeID);
    const [recipeID] = useState(recipeToEdit ? recipeToEdit.recipeID : savedRecipeID)

    useEffect(() => {
        if (recipeToEdit !== undefined) {
            localStorage.setItem('savedRecipeID', recipeToEdit.recipeID);
            localStorage.setItem('savedRecipeName', recipeToEdit.recipeName);
            localStorage.setItem('savedInstruction', recipeToEdit.instruction);
            localStorage.setItem('savedIngredients', recipeToEdit.ingredients);
            localStorage.setItem('savedCalorieCount', recipeToEdit.calorieCount);
            localStorage.setItem('savedUserID', recipeToEdit.userID);
            localStorage.setItem('savedTypeID', recipeToEdit.typeID);

        }
    }, [recipeToEdit]);

    const history = useHistory();

    const editRecipe = async e => {
        e.preventDefault();
        const updatedRecipe = { recipeName, ingredients, instruction, calorieCount, typeID, userID }

        const response = await fetch(`/recipes/${recipeID}`, {
            method: 'PUT',
            body: JSON.stringify(updatedRecipe),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                history.push('/ViewRecipes')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <MealPlannerNavbar />
            <form>
                <h1>Edit Recipe</h1>
                <div>
                    <label>Recipe Name:</label>
                    <input type="text"
                        value={recipeName}
                        placeholder='Enter Recipe Name'
                        onChange={e => setRecipeName(e.target.value)} />
                </div>
                <div>
                    <label>Ingredients:</label>
                    <textarea value={ingredients}
                        placeholder='Enter Ingredients'
                        onChange={e => setIngredients(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Instructions:</label>
                    <textarea value={instruction}
                        placeholder='Enter Instructions'
                        onChange={e => setInstruction(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Calories:</label>
                    <input type="text"
                        value={calorieCount}
                        placeholder='Enter Calorie Count'
                        onChange={e => setCalorieCount(e.target.value)} />
                </div>
                <MealTypesRadio typeID={typeID} onMealTypeChange={setTypeID} />
                <button class='btn btn-outline-dark' onClick={e => editRecipe(e)}>Save Recipe</button>
            </form>
            <br />
        </div>
    );
}

export default EditRecipe;