import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserDropdown from "../components/UserDropdown.js";
import MealPlannerNavbar from "../components/Navbar";

function CreateMealPlan() {

  const [userID, setUserID] = useState(null);
  const [planName, setPlanName] = useState('');

  const history = useHistory();

  const addMealPlan = async e => {
    e.preventDefault();
    const newMealPlan = { planName, userID }
    if (userID !== null) {
      const response = await fetch('/mealplans', {
        method: 'POST',
        body: JSON.stringify(newMealPlan),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 201) {
        history.push('/ViewMealPlans')
      } else {
        alert(`Failed to add meal plan, status code = ${response.status}. Make sure all required fields are filled out.`);
      };
    }
    else {
      alert('Please choose a User')
    }
  }



  return (
    <div>
      <form>
        <MealPlannerNavbar />
        <h1>Create Meal Plan</h1>
        <div>
          <UserDropdown userID={userID} onUserChange={setUserID} />
          <label>Plan Name:</label>
          <input type="text"
            placeholder='Enter the Meal Plan Name'
            onChange={e => setPlanName(e.target.value)} />
        </div>
        <button class='btn btn-outline-dark' onClick={e => addMealPlan(e)}>Create Meal Plan</button>
        <br />
        <button class='btn btn-outline-dark' onClick={e => history.push('/ViewMealPlans')}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateMealPlan;
