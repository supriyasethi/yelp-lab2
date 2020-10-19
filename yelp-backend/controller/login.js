var con = require('../connection');
const mysql = require('mysql');
const { check, validationResult } = require("express-validator");


// var pool      =    mysql.createPool({
//   connectionLimit : 10,
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'yelplab1',
//   debug    :  false
// }); 

function loginuser(req,res) {
    console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);  
  const errors = validationResult(req).array();
  if (errors != '') {
    var err = JSON.stringify(errors);
    console.log('err', err);
    res.writeHead(422,{
      'Content-Type' : 'text/plain'
  }); 
  res.end(err);
  } else {
  con.query("SELECT * FROM login WHERE (username = '"+ req.body.username + "' AND password = '"+ req.body.password+"')" ,(err,rows,fields) => {
    if (!err) {
      if(rows != '') {        
          res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.userId = rows[0].userId;
          console.log(req.session);
          req.session.user = req.body.username;          
          console.log('user', req.session.user);
          // res.writeHead(200,{
          //     'Content-Type' : 'text/plain'
          // })
          res.status(200).send(rows);
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Invalid Username & Password!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
}
}

// function loginuser(req,res) {
//   console.log("Inside Login Post Request");  
// console.log("Req Body : ",req.body);  
// const errors = validationResult(req).array();
// if (errors != '') {
//   var err = JSON.stringify(errors);
//   console.log('err', err);
//   res.writeHead(422,{
//     'Content-Type' : 'text/plain'
// }); 
// res.end(err);
// } else {
// pool.query("SELECT * FROM login WHERE (username = '"+ req.body.username + "' AND password = '"+ req.body.password+"')" ,(err,rows,fields) => {
//   if (!err) {
//     if(rows != '') {        
//          res.end("Successful Login!");
//     }
//     else {
//          res.writeHead(401,{
//             'Content-Type' : 'text/plain'
//         })
//         res.end("Invalid Username & Password!");
//     }
//     console.log(rows); }
//   else
//     console.log(err);
// });
// }
// }

function loginbiz(req,res) {
    console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);  
  const errors = validationResult(req).array();
  if (errors != '') {
    var err = JSON.stringify(errors);
    console.log('err', err);
    res.writeHead(422,{
      'Content-Type' : 'text/plain'
  }); 
  res.end(err);
  } else {
  con.query("SELECT * FROM loginr WHERE (username = '"+ req.body.username + "' AND password = '"+ req.body.password+"')" ,(err,rows,fields) => {
    if (!err) {
      if(rows != '') {
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});          
          req.session.restaurantId = rows[0].restaurantId;          
          req.session.user = req.body.username;
          console.log('req session', req.session.restaurantId);  
          console.log('req session user', req.session.user);
          res.status(200).send(rows);
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Invalid Username & Password!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
}
}

module.exports = {
    loginuser,
    loginbiz
}