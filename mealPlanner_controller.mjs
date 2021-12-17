import express from "express";
import cors from "cors";
import users from './routes/users.mjs'
import mealPlans from './routes/mealPlans.mjs'
import mealTypes from './routes/mealTypes.mjs'
import recipes from './routes/recipes.mjs'
import recipesMealPlans from './routes/recipesMealPlans.mjs'

const app = express();

const PORT = 9604;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", users)
app.use("/mealPlans", mealPlans)
app.use("/mealTypes", mealTypes)
app.use("/recipes", recipes)
app.use("/recipesMealPlans", recipesMealPlans)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
