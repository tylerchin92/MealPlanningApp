import db from '../db_connector.mjs'
import express from "express";

    const users = express.Router();

    // GET request for users
    users.get("/", (req, res) => {
        let sql = `SELECT * FROM users`;
        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            res.send(data);
        });
    });

    // POST for users
    users.post('/', function (req, res) {
        let sql = "INSERT INTO users (userName) VALUES (?)";
        let inserts = [req.body.userName];
        db.query(sql, inserts, function (err, data, fields) {
            if (err) throw err;
            console.log("User added successfully.")
            res.status(201);
            res.end();
        });
    });

    //  UPDATE users
    users.put('/:userID', function (req, res) {
        let sql = `UPDATE users SET userName = ? WHERE userID = ${req.params.userID}`;
        let updates = [req.body.userName];
        db.query(sql, updates, function (err, data, fields) {
            if (err) throw err;
            console.log("User updated successfully.")
            res.send(data);
        });
    });


    //  DELETE users
    users.delete('/:userID', function (req, res) {
        let sql = `DELETE FROM users WHERE userID = ?`;
        let updates = [req.params.userID];
        db.query(sql, updates, function (err, data, fields) {
            if (err) throw err;
            console.log("User deleted successfully.")
            res.status(204);
            res.end();
        });
    });

    export default users