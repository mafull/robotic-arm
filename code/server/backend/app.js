import express      from "express";
import bodyParser   from "body-parser";
import mongoose     from "mongoose";
import expressWs	from "express-ws";

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

// Initialise WebSockets
expressWs(app);
app.ws("/ws/log", (ws, req) => {
	ws.send("Hi friend!");

	const pingInterval = setInterval(() => {
		ws.send(`PING ${process.uptime()}`);
	}, 500);

	ws.on("message", msg => {
		console.log(msg);

		ws.send(`You sent: ${msg}`);

		if (msg === "get lost") {
			ws.close();
		}
	});

	ws.on("close", e => {
		clearInterval(pingInterval);
	});
});

// Listen for requests
app.listen(
	3001,
	"localhost",
	() => console.log(" -- Server started -- ")
);
