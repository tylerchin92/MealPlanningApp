import express from "express";
import cors from "cors";
import users from './routes/users.mjs'
import mealPlans from './routes/mealPlans.mjs'
import mealTypes from './routes/mealTypes.mjs'
import recipes from './routes/recipes.mjs'
import recipesMealPlans from './routes/recipesMealPlans.mjs'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", users)
app.use("/mealPlans", mealPlans)
app.use("/mealTypes", mealTypes)
app.use("/recipes", recipes)
app.use("/recipesMealPlans", recipesMealPlans)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
};

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
