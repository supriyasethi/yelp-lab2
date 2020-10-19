var con = require('../connection');
const mysql = require('mysql');
const { check, validationResult } = require("express-validator");

function user(req, res){
    console.log("Inside Signup Post Request");  
  console.log("Req Body : ",req.body);  
  const errors = validationResult(req).array();
  if (errors != '') {
    var err = JSON.stringify(errors);
    console.log('err', err);
    res.writeHead(422,{
      'Content-Type' : 'text/plain'
  }); 
  res.end(err);
  } 
  else {  
    var sql = 
      mysql.format("INSERT INTO yelplab1.user (first_name, last_name, email_id, city) VALUES('"+req.body.firstname+"','" + req.body.lastname+"','" +req.body.username+"','" +req.body.city+"')");
      con.query(sql, function (err, result) {
      if (err) {          
        res.status(401).send(err);      
  }
      else {
      console.log( result);
      sql = mysql.format("INSERT INTO yelplab1.login (username, password, userId) VALUES('"+ req.body.username+"','" +req.body.password+"'," + result.insertId+")");
      con.query(sql, function (err, result) {
        if (err) {         
        res.status(401).send(err);
        }
          else {
            console.log( result);
            res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
            res.end("Signup successful!");
          }        
        });
       }
     });          
    }
}

function biz(req, res) {
    console.log("Inside Signup Post Request");  
  console.log("Req Body : ",req.body);    
    var sql = 
      mysql.format("INSERT INTO yelplab1.restaurant (name, email_id, city) VALUES('"+req.body.name+"','" +req.body.username+"','" +req.body.city+"')");
      console.log(sql);
      con.query(sql, function (err, result) {
      if (err) {          
        res.status(401).send(err);      
        }
      else {
      console.log( result);
      sql = mysql.format("INSERT INTO yelplab1.loginr (username, password, restaurantId) VALUES('"+ req.body.username+"','" +req.body.password+"'," + result.insertId+")");
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) {         
        res.status(401).send(err);
        }
          else {
            console.log( result);
            res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
            res.end("Signup successful!");
          }        
        });
       }
     });  
}

module.exports = {
    user,
    biz
}