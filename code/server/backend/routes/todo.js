import express      from "express";
import mongoose     from "mongoose";

import { Todo }     from "../models";


const router = express.Router();


// Index
router.get("/", (req, res) => {
    console.log("GET request for todo index");

    Todo
        .find({})
        .sort([
            ["created", 1],
            ["completed", 1]
        ])
        .exec((err, todos) => {
            if (err) {
                return res.status(404).send("Unable to retrieve todos");
            }

            // Return todos
            res.json(todos);
        });
});


// Create
router.post("/", (req, res) => {
    const todo = { 
        text: req.body.text,
    };
    console.log(req.body);
    console.log(todo);

    Todo.create(todo, (err, createdTodo) => {
        if (err) {
            return res.status(404).send("Unable to save todo data");
        }

        res.json(createdTodo);
    });
});


// Update
router.put("/:id", (req, rese) => {
    Todo.findById(req.params.id, (err, existingTodo) => {
        if (err) {
            return res.status(404).send("Unable to retreive todo data");
        }

        const todo = req.body;

        existingTodo.text = todo.text;
        existingTodo.completed = todo.completed;
        existingTodo.save((err, updatedTodo) => {
            if (err) {
                return res.status(404).send("Unable to update todo data");
            }

            res.json(updatedTodo);
        });
    });
});


export default router;