/**
 * DB 연동을 위한 설정
 */

// const mysql = require("mysql2");
const mysql = require("mysql2/promise");
require("dotenv").config();
const logger = require("../config/log");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_SCHEMA,
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  connectionLimit: 100,
});
// pool.getConnection(function (err, connection) {
//   if (err) {
//     logger.error("error connecting: " + err.stack);
//     return;
//   }
//   logger.debug("connected as id " + connection.threadId);
// });

// module.exports = connection;
module.exports = pool;
