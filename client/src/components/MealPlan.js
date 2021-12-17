import React from 'react';


function MealPlan ({mealPlan, editPlan, deletePlan}) {
    return (
        <tr>
            <td>{mealPlan.planName}</td>
            <td>{mealPlan.userID}</td>
            <td><button class='btn btn-outline-dark' onClick={() => editPlan(mealPlan)}>Edit</button></td>
            <td><button class='btn btn-outline-dark' onClick={() => deletePlan(mealPlan.planID)}>Delete</button></td>
        </tr>
    )
}

export default MealPlan