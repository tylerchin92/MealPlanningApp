import db from '../db_connector.mjs'
import express from "express";

const mealPlans = express.Router();

// GET request for meal plans
mealPlans.get("/", (req, res) => {
    let sql = `SELECT * FROM mealPlans`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    });
});

// GET request for meal plans by userID
mealPlans.get("/:userID", (req, res) => {
    let sql = `SELECT * FROM mealPlans WHERE userID = ${req.params.userID}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    });
});

// POST for meal plans
mealPlans.post('/', function (req, res) {
    let sql = "INSERT INTO mealPlans (planName, userID) VALUES (?, ?)";
    let inserts = [req.body.planName, req.body.userID];
    db.query(sql, inserts, function (err, data, fields) {
        if (err) throw err;
        res.status(201);
        res.end();
        console.log("Meal plan added successfully.")
    });
});

//  UPDATE meal plans
mealPlans.put('/:planID', function (req, res) {
    let sql = `UPDATE mealPlans SET planName = ? WHERE planID = ${req.params.planID}`;
    let updates = [req.body.planName];
    db.query(sql, updates, function (err, data, fields) {
        if (err) throw err;
        console.log("Meal Plan updated successfully.")
        res.send(data);
    });
});

//  DELETE meal plans
mealPlans.delete('/:planID', function (req, res) {
    let sql = `DELETE FROM mealPlans WHERE planID = ?`;
    let updates = [req.params.planID];
    db.query(sql, updates, function (err, data, fields) {
        if (err) throw err;
        console.log("Meal Plan deleted successfully.")
        res.status(204);
        res.end();
    });
});
export default mealPlans

