import express      from "express";
import bodyParser   from "body-parser";
import mongoose     from "mongoose";

import routes       from "./routes";


// Create an express application instance
const app = express();

// Connect to the database
mongoose.connect("mongodb://localhost/robotic_arm");

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Declare routes
app.use("/api", routes);

// Listen for requests
app.listen(
	3001,
	"localhost",
	() => console.log(" -- Server started -- ")
);
