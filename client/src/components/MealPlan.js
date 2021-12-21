import React from 'react';


function MealPlan ({mealPlan, editPlan, deletePlan}) {

    return (
        <tr>
            <td>{mealPlan.planName}</td>
            <td><button class='btn btn-outline-dark' onClick={() => editPlan(mealPlan)}>Change or View</button></td>
            <td><button class='btn btn-outline-dark' onClick={() => deletePlan(mealPlan.planID)}>Delete</button></td>
        </tr>
    )
}

export default MealPlan