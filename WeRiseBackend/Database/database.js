const dotenv = require("dotenv");
dotenv.config();
const pgp = require("pg-promise")({});
// require("dotenv").config()


const database = pgp(process.env.DATABASE_URL);

module.exports = database;