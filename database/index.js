const mongoose = require("mongoose");
// const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../app/config");
// console.log(dbHost, dbPass, dbName, dbUser);
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`);

const db = mongoose.connection;
module.exports = db;
