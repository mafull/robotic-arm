import express      from "express";
import bodyParser   from "body-parser";
import mongoose     from "mongoose";
import expressWs	from "express-ws";

import middleware	from "./middleware";
import lt			from "./LogTools";
import routes       from "./routes";

// Initialse LogTools
lt.init("./log", ".log");

// Create an express application instance
const app = express();

// Add middleware
app.use(middleware.logRequest);

// Connect to the database
mongoose.connect("mongodb://localhost/robotic_arm", err => {
	if (err) {
		return lt.error(err.message);
	}

	lt.log("Connected to MongoDB database");
});

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Declare routes
app.use("/api", routes);

// Initialise WebSockets
expressWs(app);
app.ws("/ws/log", (ws, req) => {
	// Enable websocket logging functionality
	lt.setWsHandle(ws);

	ws.send("Hi friend!");

	const pingInterval = setInterval(() => {
		ws.send(`PING ${process.uptime()}`);
	}, 500);

	ws.on("message", msg => {
		lt.log(msg);

		ws.send(`You sent: ${msg}`);

		if (msg === "get lost") {
			ws.close();
		}
	});

	ws.on("close", e => {
		clearInterval(pingInterval);
		lt.setWsHandle(null);
	});
});

// Listen for requests
app.listen(
	3001,
	"localhost",
	() => lt.log("Server started")
);
