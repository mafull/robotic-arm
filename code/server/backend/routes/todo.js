import express      from "express";
import mongoose     from "mongoose";

import { Todo }     from "../models";


const router = express.Router();


// Index
router.get("/", (req, res) => {
    Todo
        .find({})
        .sort([
            ["completed", 1],
            ["created", 1]
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
        action: req.body.action,
        completed: req.body.completed,
        created: req.body.created
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
router.put("/:id", (req, res) => {
    Todo.findById(req.params.id, (err, existingTodo) => {
        if (err) {
            return res.status(404).send("Unable to retreive todo data");
        }

        const todo = req.body;

        existingTodo.action = todo.action;
        existingTodo.completed = todo.completed;
        existingTodo.save((err, updatedTodo) => {
            if (err) {
                return res.status(404).send("Unable to update todo data");
            }

            res.json(updatedTodo);
        });
    });
});


// Destroy
router.delete("/:id", (req, res) => {
    Todo.findByIdAndRemove(req.params.id, err => {
        if (err) {
            return res.status(404).send("Unable to delete todo");
        }

        res.json({});
    });
});


export default router;