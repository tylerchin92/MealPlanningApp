import React from 'react';
import Recipe from './Recipe'
import Table from 'react-bootstrap/Table';

function RecipesTable({recipes, onEdit, deleteRecipe}) {
    return (
        <div>
            <h2>Recipes Table</h2>
        <Table size='sm' bordered hover responsive>
            <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Ingredients</th>
                        <th>Instruction</th>
                        <th>Calorie Count Per Serving</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, i) => <Recipe
                        recipe={recipe}
                        onEdit={onEdit}
                        deleteRecipe={deleteRecipe}
                        key={i} />)}
                </tbody>
        </Table>
        </div>
    );
};

export default RecipesTable