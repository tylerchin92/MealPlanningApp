-- Data Manipulation Queries


-- Get all recipes for the recipes table
SELECT * FROM recipes;

-- Select specific recipe
SELECT recipeID AS recipeName, ingredients, instruction, calorieCount FROM recipes WHERE recipeID = :selectedRecipeID;

-- Get all users for the users table
SELECT * FROM users;

-- Get all meal plans for the meal plans table
SELECT * FROM mealPlans;

-- Select specific meal plan
SELECT planID AS planName FROM mealPlans WHERE planID = :selectedPlanID;

-- Get all meal types for the meal types table
SELECT * FROM mealTypes;

-- Get all recipes/meal plans from the recipesMealPlans table
SELECT * FROM recipesMealPlans;

-- Get all recipes/meal types from the recipesMealTypes table
SELECT * FROM recipesMealTypes;

-- Create new user
INSERT INTO users (userName)
VALUES (:userNameInput);

-- Create new recipe
INSERT INTO recipes (recipeName, ingredients, instruction, calorieCount, userID)
VALUES (:recipeNameInput, :ingredientsInput, :instructionInput, :calorieCountInput, :userIDInput);

-- Create new meal plan
INSERT INTO mealPlans (planName)
VALUES (:planNameInput);

-- Create new meal type
INSERT INTO mealTypes (mealName)
VALUES (:mealNameInput);

-- Create new recipe/meal type relationship
INSERT INTO recipesMealTypes (typeID, recipeID)
VALUES (:typeIDInput, :recipeIDInput);

-- Create new recipe/meal plan relationship
INSERT INTO recipesMealPlans (recipeID, planID, day, assignedMeal)
VALUES (:recipeIDInput, :planIDInput,:dayInput, :assignedMealInput);

-- Delete a recipe
DELETE FROM recipes WHERE recipeID = :selectedRecipeID;

-- Delete a meal plan
DELETE FROM mealPlans WHERE planID = :selectedPlanID;

-- Delete a user
DELETE FROM users WHERE userID = :selectedUserID;

-- Delete a meal type
DELETE FROM mealTypes WHERE typeID = :selectedTypeID;

-- Delete a recipe/meal type relationship
DELETE FROM recipesMealTypes WHERE typeID = :selectedTypeID AND recipeID = :selectedRecipeID;

-- Delete a recipe/meal plan relationship
DELETE FROM recipesMealPlans WHERE recipeID = :selectedRecipeID AND planID = :selectedPlanID;

-- Update a recipe
UPDATE recipes SET recipeName = :recipeNameInput, ingredients = :ingredientsInput, instruction = :instructionInput, calorieCount = :calorieCountInput WHERE recipeID = :selectedRecipeID;

-- Update a meal plan
UPDATE mealPlans SET planName = :planNameInput WHERE planID = :selectedPlanID;

-- Update a user
UPDATE users SET userName = :userNameInput WHERE userID = :selectedUserID;

--Update a meal type
UPDATE mealTypes SET mealName = :planNameInput WHERE planID = :selectedPlanID;

--Update a recipe/meal type relationship
UPDATE recipeMealTypes SET typeID = :typeIDInput WHERE recipeID = :selectedRecipeID;

--Update a recipe/meal plan relationship
UPDATE recipeMealTypes SET day = :dayInput, assignedMeal = :assignedMealInput WHERE recipeID = :selectedRecipeID AND planID = :selectedPlanID;



