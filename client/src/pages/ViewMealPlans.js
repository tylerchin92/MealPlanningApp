import { Link } from "react-router-dom";
import MealPlansTable from "../components/MealPlansTable";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MealPlannerNavbar from "../components/Navbar";


function ViewMealPlans({setMealPlanToEdit, deletePlan}) {

    const [mealPlans, setMealPlans] = useState([]);

    const history = useHistory();

    const getMealPlans = async () => {
        const response = await fetch('/mealplans');
        
        const data = await response.json();

        if (response.ok) {
            setMealPlans(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        }
    };

    const editPlan = mealPlan => {
        setMealPlanToEdit(mealPlan)
        history.push('/EditMealPlan')
      };


    useEffect(() => {
        getMealPlans();
    }, []);
    
    return (
        <div>
            <MealPlannerNavbar />
            <MealPlansTable mealPlans={mealPlans} editPlan={editPlan} deletePlan={deletePlan} />
            <button class='btn btn-outline-dark' onClick={() => history.push('/CreateMealPlan')}>Create New Meal Plan</button>
        </div>
    )
}

export default ViewMealPlans