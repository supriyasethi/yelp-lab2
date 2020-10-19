"use strict";
const mysql = require('mysql2');

//creating mysql database connection
var connection = mysql.createConnection({
    host: "yelplab1.cnnjxrppwwnv.us-west-1.rds.amazonaws.com",
    //host: "localhost",
    user: "master",
    //user: "root",
    password: "password",
    database: "yelplab1"
  });
  
connection.connect(function(err) { 
    if (err) throw err;
    console.log("Database Connected!");
  });


module.exports = connection;