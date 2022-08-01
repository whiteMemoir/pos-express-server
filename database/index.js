const mongoose = require("mongoose");
const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../app/config");

mongoose.connect(
	"mongodb+srv://devy:devy@cluster0.jtol3.mongodb.net/cloudbread?retryWrites=true&w=majority"
	// "mongodb+srv://" +
	// 	dbUser +
	// 	":" +
	// 	dbPass +
	// 	"@" +
	// 	dbHost +
	// 	"/" +
	// 	dbName +
	// 	"?retryWrites=true&w=majority",
	// {
	// 	useUnifiedTopology: true,
	// 	useNewUrlParser: true,
	// }
);
// mongodb+srv://<username>:<password>@cluster0.jtol3.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect(
// 	`mongodb%2Bsrv%3A%2F%2F${dbUser}%3A${dbPass}%40${dbHost}%2F${dbName}`
// );

const db = mongoose.connection;
module.exports = db;
