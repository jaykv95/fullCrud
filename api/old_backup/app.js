var express = require("express");
var app = new express();
var cors = require("cors");
var bodyParser = require("body-parser");
var auth = require("./controllers/auth");
var api = require("./controllers/api");
var pool = require("./config/db");

pool.getConnection(function(err, connection) {
  if (err)  {
    console.log("Error Connecting to DB : "+ err);
    throw err; // not connected!
  }
  console.log("Database Connected Successfully"); 
  connection.release();
  console.log("Released Test Connection");
  });


console.log("Server Successfully Started");

app.use(cors({ origin: "http://localhost:4200" }));
app.use(bodyParser.json());
/* app.use(auth.router);
app.use("/auth", auth.router);
 */
app.use("/api", api);
app.listen(3000);
