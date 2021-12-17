-- Part A: Data Definition Queries

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`)
);


DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
  `recipeID` int(11) NOT NULL AUTO_INCREMENT,
  `recipeName` varchar(255) NOT NULL,
  `ingredients` varchar(1000) NOT NULL, 
  `instruction` varchar(1000) NOT NULL, 
  `calorieCount` int(10),
  `typeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`recipeID`),
  FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  FOREIGN KEY (`typeID`) REFERENCES `mealTypes` (`typeID`) ON DELETE CASCADE
);


DROP TABLE IF EXISTS `mealTypes`;
CREATE TABLE `mealTypes` (
  `typeID` int(11) NOT NULL AUTO_INCREMENT,
  `mealName` varchar(9) NOT NULL,
  PRIMARY KEY (`typeID`)
);


DROP TABLE IF EXISTS `mealPlans`;
CREATE TABLE `mealPlans` (
  `planID` int(11) NOT NULL AUTO_INCREMENT,
  `planName` varchar(255) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`planID`),
  FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) on DELETE CASCADE
);


DROP TABLE IF EXISTS `recipesMealPlans`;
CREATE TABLE `recipesMealPlans` (
  `recipeID` int(11) NOT NULL,
  `planID` int(11) NOT NULL,
  `day` varchar(10) NOT NULL,
  `assignedMeal` varchar(10) NOT NULL,
  PRIMARY KEY (`planID`, `day`, `assignedMeal`),
  FOREIGN KEY (`planID`) REFERENCES `mealPlans` (`planID`) on DELETE CASCADE,
  FOREIGN KEY (`recipeID`) REFERENCES `recipes` (`recipeID`) on DELETE CASCADE
);

-- Part B: Sample Data 

INSERT INTO `users` VALUES (1, 'Eric'), (2, 'Tyler');

INSERT INTO `recipes` VALUES (1, 'Chicken Parmesan', 'Chicken, Parmesan', 'Bake it in oven at 425F', 800, 3, 1), (2, 'Pancakes', 'Flour, Eggs, Milk, Butter', 'Mix ingredients in bowl. Cook on Skillet.', 670, 1, 1),
(3, 'Roast Beef Sandwich', 'Roast Beef, Bread, Lettuce, Onions', 'Assemble sandwich.', 450, 2, 1);

INSERT INTO `mealTypes` VALUES (1, 'Breakfast'), (2, 'Lunch'), (3, 'Dinner');

INSERT INTO `mealPlans` VALUES (1, 'Healthy Choices', 1), (2, 'What is a diet?', 1), (3, 'Protein', 1);

INSERT INTO `recipesMealTypes` VALUES (3, 1), (1,2) , (2,3);  

INSERT INTO `recipesMealPlans` VALUES (1, 3, 'Saturday', 'Dinner'), (2, 3, 'Saturday', 'Breakfast'), (3, 3, 'Saturday', 'Lunch');

