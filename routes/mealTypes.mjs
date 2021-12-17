import db from '../db_connector.mjs'
import express from "express";


const mealTypes = express.Router();

// GET request for meal types
mealTypes.get("/", (req, res) => {
    let sql = `SELECT * FROM mealTypes`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
    });
});

export default mealTypes;
