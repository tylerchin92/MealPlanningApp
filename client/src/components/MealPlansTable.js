import React from 'react';
import MealPlan from './MealPlan';

function MealPlansTable({ mealPlans, editPlan, deletePlan }) {
    return (
        <div>
            <table class='table bordered table-hover'>
                <thead>
                    <tr>
                        <th>Meal Plan</th>
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