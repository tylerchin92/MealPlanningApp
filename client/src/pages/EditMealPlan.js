import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RecipesMealPlansTable from "../components/RecipesMealPlansTable";
import RecipeDropdown from "../components/RecipeDropdown";
import MealPlannerNavbar from "../components/Navbar";
import Table from 'react-bootstrap/Table';

function EditMealPlan({ mealPlanToEdit, setPlanNameToEdit, setPlanIDToEdit }) {

  const storedName = localStorage.getItem('savedName');
  const storedID = Number(localStorage.getItem('savedID'));
  const [mealPlanName, setMealPlanName] = useState(mealPlanToEdit ? mealPlanToEdit.planName : storedName)
  const [planID, setPlanID] = useState(mealPlanToEdit ? mealPlanToEdit.planID : storedID);
  const [recipeID, setRecipeID] = useState(null);
  const [day, setDay] = useState(null);
  const [assignedMeal, setAssignedMeal] = useState(null);
  const [recipesMealPlans, setRecipesMealPlans] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (mealPlanToEdit !== undefined) {
      localStorage.setItem('savedID', mealPlanToEdit.planID);
      localStorage.setItem('savedName', mealPlanToEdit.planName);
    }
  }, [mealPlanToEdit]);

  const editPlanName = () => {
    setPlanNameToEdit(mealPlanName);
    setPlanIDToEdit(planID)
    history.push('/EditMealPlanName')
  };

  const getRecipesMealPlans = async () => {
    const response = await fetch('/recipesMealPlans');

    const data = await response.json();

    if (response.ok) {
      setRecipesMealPlans(data);
    }
    else {
      console.error(`Could not fetch, status code = ${response.status}`)
    }
  };

  const addRecipeToMealPlan = async () => {

    setMealPlanName(localStorage.getItem('savedName'));
    setPlanID(localStorage.getItem('savedID'));
    const newAssignment = { recipeID, planID, day, assignedMeal }
    const filter = recipesMealPlans.filter(e => e.planID === planID && e.day === day && e.assignedMeal === assignedMeal)

    if (filter.length > 0) {
      const response = await fetch(`/recipesmealplans/${planID}/${assignedMeal}/${day}`, {
        method: 'PUT',
        body: JSON.stringify(newAssignment),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {

      } else {
        alert(`Failed to update meal plan, status code = ${response.status}.`);
      };
      window.location.reload(false);
    }
    else if (recipeID !== null && day !== null && assignedMeal !== null) {
      const response = await fetch('/recipesmealplans', {
        method: 'POST',
        body: JSON.stringify(newAssignment),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 201) {

      } else {
        alert(`Failed to add recipe to meal plan, status code = ${response.status}. Make sure all required fields are filled out.`);
      };
      window.location.reload(false);
    }
    else {
      alert('Please fill out all required fields before submitting.')
    }
  };

  const deleteRecipeFromMealPlan = async (planID, recipeID, day) => {
    const response = await fetch(`/recipesmealplans/${planID}/${recipeID}/${day}`, { method: 'DELETE' });
    if (response.status === 204) {
      window.location.reload(false);
    }
    else {
      console.error(`Failed to delete recipe from meal plan with planID = ${planID} recipeID = ${recipeID} day=${day}, status code = ${response.status}`)
    }
  };
  
  useEffect(() => {
    getRecipesMealPlans();
  }, [])
  return (
    <div>
      <MealPlannerNavbar />
      <h1>My Meal Plan</h1>
      <h4>{mealPlanName} <button class='btn btn-outline-dark' onClick={() => editPlanName()}>Edit Plan Name</button></h4>
      <Table size='sm' bordered responsive>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <RecipesMealPlansTable planID={planID} deleteRecipeFromMealPlan={deleteRecipeFromMealPlan} />
      </Table>
      <h2>Add Meal to Meal Plan</h2>
      <RecipeDropdown recipeID={recipeID} onRecipeChange={setRecipeID} />
      <label>Choose Day</label>
      <select onChange={e => setDay(e.target.value)}>
        <option value="">--Select one--</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>
      <br />

      <label>Choose Meal</label>
      <select onChange={e => setAssignedMeal(e.target.value)}>
        <option value="">--Select one--</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <br />
      <button class='btn btn-outline-dark' onClick={() => addRecipeToMealPlan()}>Update Meal Plan</button>
    </div>
  );
};

export default EditMealPlan;
