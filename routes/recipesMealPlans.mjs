import db from '../db_connector.mjs'
import express from "express";

const recipesmealPlans = express.Router();

// GET request for recipes/ meal plans
recipesmealPlans.get("/", (req, res) => {
    let sql = `SELECT * FROM recipesMealPlans`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    });
});

// GET request for recipes/ meal plans
recipesmealPlans.get("/:planID", (req, res) => {
    let sql = `SELECT * FROM recipesMealPlans WHERE planID = ${req.params.planID}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    });
});

// POST for recipes/meal plans
recipesmealPlans.post('/', function (req, res) {
    let sql = "INSERT INTO recipesMealPlans (recipeID, planID, day, assignedMeal) VALUES (?, ?, ?, ?)";
    let inserts = [req.body.recipeID, req.body.planID, req.body.day, req.body.assignedMeal];
    db.query(sql, inserts, function (err, data, fields) {
        if (err) throw err;
        console.log("Recipe/Meal Plan relationship added successfully.")
        res.status(201);
        res.end();
    });
});

//  UPDATE recipesMealPlans
recipesmealPlans.put('/:planID/:assignedMeal/:day', function (req, res) {
    let sql = `UPDATE recipesMealPlans SET recipeID = ?, planID = ?, day = ?, assignedMeal = ? WHERE planID = ${req.params.planID} AND day = '${req.params.day}' AND assignedMeal = '${req.params.assignedMeal}'`;
    let updates = [req.body.recipeID, req.body.planID, req.body.day, req.body.assignedMeal];
    db.query(sql, updates, function (err, data, fields) {
        if (err) throw err;
        console.log("Meal Plan entry updated successfully.");
        res.send(data);
    });
});


//  DELETE recipe/meal plan relationships
recipesmealPlans.delete('/:planID/:recipeID/:day', function (req, res) {
    let sql = `DELETE FROM recipesMealPlans WHERE planID = ? AND recipeID = ? AND day = ?`;
    let updates = [req.params.planID, req.params.recipeID, req.params.day];
    db.query(sql, updates, function (err, data, fields) {
        if (err) throw err;
        console.log("Meal Plan entry deleted successfully.")
        res.status(204);
        res.end();
    });
});
export default recipesmealPlans