import { Link } from "react-router-dom";
import RecipesTable from "../components/RecipesTable";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MealTypeFilter from "../components/MealTypeFilter";
import MealPlannerNavbar from "../components/Navbar";

function ViewRecipes({setRecipeToEdit}) {

    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [typeID, setTypeID] = useState('null');

    const history = useHistory();

    const getRecipes = async () => {
        const response = await fetch('/recipes');
        
        const data = await response.json();

        if (response.ok) {
            setRecipes(data);
            setFilteredRecipes(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        }
    };

    const deleteRecipe = async recipeID => {
        const response = await fetch(`/recipes/${recipeID}`, {method: 'DELETE'});
        if (response.status === 204) {
            window.location.reload(false);
        }
        else {
            console.error(`Failed to delete recipe with recipeID = ${recipeID}, status code = ${response.status}`)
        }
    };

    const recipeSearch = typeID => {
        if (typeID === 'null') {
            setFilteredRecipes(recipes);
        }
        else {
        const search = recipes.filter(recipe => recipe.typeID === Number(typeID));
        setFilteredRecipes(search);
        };
    };

    const onEdit = recipe => {
        setRecipeToEdit(recipe);
        history.push('/EditRecipe')
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <div>
            <MealPlannerNavbar />
            <MealTypeFilter typeID={typeID} setTypeID={setTypeID} recipeSearch={recipeSearch}/>
            <RecipesTable recipes={filteredRecipes} onEdit={onEdit} deleteRecipe={deleteRecipe}></RecipesTable>
            <button class='btn btn-outline-dark' onClick={() => history.push('/CreateRecipe')}>Create New Recipe</button>
        </div>
    )
}

export default ViewRecipes