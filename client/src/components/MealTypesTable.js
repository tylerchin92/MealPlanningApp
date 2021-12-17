import React from 'react';
import MealType from './MealType';

function MealTypesTable({mealTypes}) {
    return (
        <div>
            <h2>Meal Types Table</h2>
        <table class='table bordered table-hover'>
            <thead>
                    <tr>
                        <th>Meal Type</th>
                    </tr>
                </thead>
                <tbody>
                    {mealTypes.map((mealType, i) => <MealType
                        mealType={mealType}
                        key={i} />)}
                </tbody>
        </table>
        </div>
    );
};

export default MealTypesTable