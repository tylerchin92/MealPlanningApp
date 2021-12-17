import React from 'react';
import { useState, useEffect, useCallback} from 'react';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';


function RecipesMealPlansTable({ planID, deleteRecipeFromMealPlan }) {

    const [recipeMealPlans, setRecipeMealPlans] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const getRecipeMealPlans = async planID => {
        const response = await fetch(`/recipesmealplans/${planID}`);
        
        const data = await response.json();

        if (response.ok) {
            setRecipeMealPlans(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        }
    };

    const getRecipes = async () => {
        const response = await fetch(`/recipes`);
        
        const data = await response.json();

        if (response.ok) {
            setRecipes(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        }
    }; 

    useEffect(() => {
        getRecipeMealPlans(planID);
    }, []);

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipeByID = recipeID => {
        const filteredRecipe = recipes.filter((recipe) => recipe.recipeID === recipeID)
        const newRecipe = filteredRecipe[0]
        return newRecipe.recipeName
    }

    const mealEntries = meal => {
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let entryArr = []
        const filteredEntries = recipeMealPlans.filter((recipe) => recipe.assignedMeal === meal)

        for (let day in days) {
            
            let filteredByDay = filteredEntries.filter((recipe) => recipe.day === days[day])
            
            if (filteredByDay.length !== 1) {
                entryArr.push(<td key={day}>-</td>)  
            }
            else { 
                
                entryArr.push(<td key={day}>{getRecipeByID(filteredByDay[0].recipeID)} <AiOutlineDelete onClick={() => deleteRecipeFromMealPlan(filteredByDay[0].planID, filteredByDay[0].recipeID, filteredByDay[0].day)} /></td>)  
            };
        };

        return entryArr

    }

    if (recipes.length > 0 && recipeMealPlans.length > 0) {
    return (
        
        <tbody>
            <tr><td>Breakfast</td>{ mealEntries('Breakfast')}</tr>
            <tr><td>Lunch</td>{ mealEntries('Lunch')}</tr>
            <tr><td>Dinner</td>{ mealEntries('Dinner')}</tr>
        </tbody>
    )
    }
    else {
        return null
    }
    
}

export default RecipesMealPlansTable