var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "{HOSTNAME}",
  port:  {PORT},
  user: "{USERNAME}",
  password: "{PASSWORD}",
  database: "{DBNAME}",
  multipleStatements: true
});

module.exports = pool;
