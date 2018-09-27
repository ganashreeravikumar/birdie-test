const mysql = require('mysql');
const { DB } = require('./config');

module.exports = mysql.createConnection({
  host: DB.host,
  user: DB.username,
  password: DB.password,
  database: DB.database
});