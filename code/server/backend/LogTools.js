import fs		from "fs";
import moment	from "moment";


// Handle for log file write stream
let wFile = null;


const baseInit = (dir, ext) => {
	// Check for valid input arguments
	if (
		typeof(dir) !== "string" ||
		typeof(ext) !== "string") {
			console.error("Invalid arguments to LogTools.init()!");
			return false;
	}

	// Add / or . if necesary
	if (dir[-1] !== "/") dir = `${dir}/`;
	if (ext[0] !== ".") ext = `.${ext}`;

	// Generate the file name based on the current date and time
	const fileName = moment().format(`DD-MM-YYYY_HH-mm-ss[${ext}]`)

	// Generate the file path
	const fullPath = dir + fileName;

	// Create and open the file for writing
	wFile = fs.createWriteStream(fullPath, { flags: "w" });
	
	console.log("-".repeat(100));
	console.log(`LogTools initialised, log file opened: ${fullPath}`);
	console.log("-".repeat(100));
}


const genericLog = (message, type) => {
	// Generate log string
	const str = `${new Date().getTime()}|${message} \n`;

	switch (type) {
		case 'l':
			console.log(message);
			wFile && wFile.write(str);
			break;
		case 'e':
			console.error(message);
			wFile && wFile.write(str);
			break;
	}
}


module.exports = {
	init: (dir, ext) => baseInit(dir, ext),
	log: (msg) => genericLog(msg, "l"),
	error: (msg) => genericLog(msg, "e")
};
