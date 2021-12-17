import React from 'react';
import MealPlan from './MealPlan';

function MealPlansTable({mealPlans, editPlan, deletePlan}) {
    return (
        <div>
            <h2>Meal Plans Table</h2>
        <table class='table bordered table-hover'>
            <thead>
                    <tr>
                        <th>Meal Plan</th>
                        <th>User ID</th>
                        <th>Edit/View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {mealPlans.map((mealPlan, i) => <MealPlan
                        mealPlan={mealPlan}
                        editPlan={editPlan}
                        deletePlan={deletePlan}
                        key={i} />)}
                </tbody>
        </table>
        </div>
    );
};

export default MealPlansTable