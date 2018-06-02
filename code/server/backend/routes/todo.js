import express      from "express";
import mongoose     from "mongoose";

import { Todo }     from "../models";


const router = express.Router();


// Index
router.get("/", (req, res) => {
    console.log("GET request for todo index");

    Todo
        .find({})
        .exec((err, todos) => {
            if (err) {
                return res.status(404).send("Unable to retrieve todos");
            }

            // Return todos
            res.json(todos);
        });
});


export default router;