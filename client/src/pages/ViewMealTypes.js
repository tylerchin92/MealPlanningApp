import { Link } from "react-router-dom";
import MealTypesTable from "../components/MealTypesTable";
import { useState, useEffect } from 'react';
import MealPlannerNavbar from '../components/Navbar'

function ViewMealTypes() {
    
    const [mealTypes, setMealTypes] = useState([]);

    const getMealTypes = async () => {
        const response = await fetch('/mealtypes');
        
        const data = await response.json();

        if (response.status === 200) {
            setMealTypes(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        }
    }; 

    useEffect(() => {
        getMealTypes();
    }, []);

    return (
        <div>
            <MealPlannerNavbar />
            <MealTypesTable mealTypes={mealTypes} />
        </div>
    )
}

export default ViewMealTypes