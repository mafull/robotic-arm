import lt		from "../LogTools";


const logRequest = (req, res, next) => {
	lt.log(`${req.method} ${req.originalUrl} from ${req.ip}`);

	next();
}


module.exports = {
	logRequest: logRequest
};