import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import CreateRecipe from "./pages/CreateRecipe";
import EditMealPlan from "./pages/EditMealPlan";
import CreateMealPlan from "./pages/CreateMealPlan";
import ViewMealPlans from "./pages/ViewMealPlans";
import ViewRecipes from "./pages/ViewRecipes";
import ViewMealTypes from "./pages/ViewMealTypes"
import ViewUsers from "./pages/ViewUsers"
import "./App.css";
import EditUser from "./pages/EditUser";
import EditRecipe from "./pages/EditRecipe";
import EditMealPlanName from "./pages/EditMealPlanName";

function App() {

  const [mealPlanToEdit, setMealPlanToEdit] = useState();
  const [userToEdit, setUserToEdit] = useState();
  const [recipeToEdit, setRecipeToEdit] = useState();
  const [planNameToEdit, setPlanNameToEdit] = useState();
  const [planIDToEdit, setPlanIDToEdit] = useState()

  const deletePlan = async planID => {
    const response = await fetch(`/mealPlans/${planID}`, {method: 'DELETE'});
    if (response.status === 204) {
        window.location.reload(false);
    }
    else {
        console.error(`Failed to delete recipe with planID = ${planID}, status code = ${response.status}`)
    }
};

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Switch>
              <Route path="/" exact>
                <HomePage setMealPlanToEdit={setMealPlanToEdit} deletePlan={deletePlan} />
              </Route>
              <Route path="/CreateRecipe">
                <CreateRecipe />
              </Route>
              <Route path="/EditMealPlan">
                <EditMealPlan mealPlanToEdit={mealPlanToEdit} setPlanNameToEdit={setPlanNameToEdit} setPlanIDToEdit={setPlanIDToEdit} />
              </Route>
              <Route path="/CreateMealPlan">
                <CreateMealPlan />
              </Route>
              <Route path="/ViewMealPlans">
                <ViewMealPlans setMealPlanToEdit={setMealPlanToEdit} deletePlan={deletePlan} />
              </Route>
              <Route path="/ViewRecipes">
                <ViewRecipes setRecipeToEdit={setRecipeToEdit}/>
              </Route>
              <Route path="/ViewUsers">
                <ViewUsers setUserToEdit={setUserToEdit}/>
              </Route>
              <Route path="/ViewMealTypes">
                <ViewMealTypes />
              </Route>
              <Route path="/EditUser">
                <EditUser userToEdit={userToEdit} />
              </Route>
              <Route path="/EditRecipe">
                <EditRecipe recipeToEdit={recipeToEdit} />
              </Route>
              <Route path="/EditMealPlanName">
                <EditMealPlanName planNameToEdit={planNameToEdit} planIDToEdit={planIDToEdit} />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
