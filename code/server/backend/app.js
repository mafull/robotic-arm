import express      from "express";
import mongoose     from "mongoose";


const app = express();
app.listen(
    3001,
    "localhost",
    () => console.log(" -- Server started -- ")
);
