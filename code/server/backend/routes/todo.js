import express      from "express";
import mongoose     from "mongoose";

import lt           from "../LogTools";
import { Todo }     from "../models";


const router = express.Router();


// Index
router.get("/", (req, res) => {
    lt.log(`GET ${req.originalUrl} from ${req.ip}`);

    Todo
        .find({})
        .sort({
            completed: 1, 
            creationTime: 1
        })
        .exec((err, todos) => {
            if (err) {
                return res.status(404).send("Unable to retrieve todos");
            }

            // Sort order of completed tasks by completion time and recombine
            const nonComplete = todos.filter(t => !t.completed);
            const complete = todos
                .filter(t => t.completed)
                .sort((a, b) => new Date(b.completionTime) - new Date(a.completionTime));
            res.json([...nonComplete, ...complete]);
        });
});


// Create
router.post("/", (req, res) => {
    lt.log(`POST ${req.originalUrl} from ${req.ip}`);

    const todo = { 
        task: req.body.task,
        completed: req.body.completed,
        creationTime: req.body.creationTime,
        completionTime: req.body.completionTime
    };

    Todo.create(todo, (err, createdTodo) => {
        if (err) {
            return res.status(404).send("Unable to save todo data");
        }

        res.json(createdTodo);
    });
});


// Update
router.put("/:id", (req, res) => {
    lt.log(`UPDATE ${req.originalUrl} from ${req.ip}`);

    Todo.findById(req.params.id, (err, existingTodo) => {
        if (err) {
            return res.status(404).send("Unable to retreive todo data");
        }

        const todo = req.body;

        existingTodo.task = todo.task;
        existingTodo.completed = todo.completed;
        existingTodo.completionTime = Date.now();
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
    lt.log(`DELETE ${req.originalUrl} from ${req.ip}`);

    Todo.findByIdAndRemove(req.params.id, err => {
        if (err) {
            return res.status(404).send("Unable to delete todo");
        }

        res.json({});
    });
});


export default router;