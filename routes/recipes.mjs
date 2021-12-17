import db from '../db_connector.mjs'
import express from "express";

const recipes = express.Router();

// GET request for recipes
recipes.get("/", (req, res) => {
    let sql = `SELECT * FROM recipes`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    });
});

// GET request for recipes by recipeID
recipes.get("/:recipeID", (req, res) => {
    let sql = `SELECT * FROM recipes WHERE recipeID = ${req.params.recipeID}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    });
});

// POST for recipes
recipes.post('/', function (req, res) {
    let sql = "INSERT INTO recipes (recipeName, ingredients, instruction, calorieCount,typeID, userID) VALUES (?, ?, ?, ?, ?, ?)";
    let inserts = [req.body.recipeName, req.body.ingredients, req.body.instruction, req.body.calorieCount, req.body.typeID, req.body.userID];
    db.query(sql, inserts, function (err, data, fields) {
        if (err) throw err;
        console.log("Recipe added successfully.")
        res.status(201);
        res.end();
    });
});

//  UPDATE recipes
recipes.put('/:recipeID', function (req, res) {
    let sql = `UPDATE recipes SET recipeName = ?, ingredients = ?, instruction = ?, calorieCount = ?, typeID = ?, userID = ? WHERE recipeID = ${req.params.recipeID}`;
    let updates = [req.body.recipeName, req.body.ingredients, req.body.instruction, req.body.calorieCount, req.body.typeID, req.body.userID];
    db.query(sql, updates, function (err, data, fields) {
        if (err) throw err;
        console.log("Recipe updated successfully.")
        res.send(data);
    });
});

//  DELETE recipes
recipes.delete('/:recipeID', function (req, res) {
    let sql = `DELETE FROM recipes WHERE recipeID = ?`;
    let updates = [req.params.recipeID];
    db.query(sql, updates, function (err, data, fields) {
        if (err) throw err;
        console.log("Recipe deleted successfully.")
        res.status(204);
        res.end();
    });
});

export default recipes