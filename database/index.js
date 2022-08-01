const mongoose = require("mongoose");
const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../app/config");

mongoose.connect(
	"mongodb+srv://" + dbUser + ":" + dbPass + "@" + dbHost + "/" + dbName
	// "?retryWrites=true&w=majority"
);
// mongoose.connect(
// 	`mongodb%2Bsrv%3A%2F%2F${dbUser}%3A${dbPass}%40${dbHost}%2F${dbName}`
// );

const db = mongoose.connection;
module.exports = db;
