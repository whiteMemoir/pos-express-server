const mongoose = require("mongoose");
// const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../app/config");
// console.log(dbHost, dbPass, dbName, dbUser);
mongoose.connect(
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
);

const db = mongoose.connection;
module.exports = db;
