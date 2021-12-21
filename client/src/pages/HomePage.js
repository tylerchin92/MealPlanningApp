import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import UserDropdownForHomePage from "../components/UserDropdownForHomePage";
import MealPlansTable from "../components/MealPlansTable";
import MealPlannerNavbar from "../components/Navbar";

function HomePage({ setMealPlanToEdit, deletePlan }) {


  const [mealPlans, setMealPlans] = useState([]);
  const [filteredMealPlans, setFilteredMealPlans] = useState([]);
  const history = useHistory();

  const getMealPlans = async () => {
    const response = await fetch(`/mealplans`);

    const data = await response.json();

    if (response.ok) {
      setMealPlans(data);
      setFilteredMealPlans(data);
    }
    else {
      console.error(`Could not fetch, status code = ${response.status}`)
    }
  }

  const filterMealPlans = userID => {
    if (userID === 'null') {
      setFilteredMealPlans(mealPlans);
    }
    else {
      const filter = mealPlans.filter(mealPlan => mealPlan.userID === Number(userID));
      setFilteredMealPlans(filter);
    };
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
      <div>
        <MealPlannerNavbar />
      </div>
      <UserDropdownForHomePage onUserChange={filterMealPlans} />
      <br />
      <MealPlansTable mealPlans={filteredMealPlans} editPlan={editPlan} deletePlan={deletePlan} />
      <button class='btn btn-outline-dark' onClick={() => history.push('/CreateMealPlan')}>Create New Meal Plan</button>
      <br />
    </div>)
}

export default HomePage;
