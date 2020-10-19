var con = require('../connection');
const mysql = require('mysql');
var express = require('express');
var app = express();
const { check, validationResult } = require("express-validator");
var fileupload = require('express-fileupload');
function userprofile(req, res) {
  console.log("Inside Update User Profile Post Request");  
  console.log("Req Body : ",req.body);    

  var sql = "UPDATE user SET \
        first_name = '" + req.body.firstname + "', \
        last_name = '" + req.body.lastname + "', \
        nickname = '" + req.body.nickname	 + "', \
        date_of_birth = '" + req.body.birthday + "', \
        state = '" + req.body.state	 + "', \
        country = '" + req.body.country	+ "', \
        gender = '" + req.body.gender + "', \
        phone_number = '" + req.body.phonenumber + "', \
        yelping_since = '" + req.body.yelpingsince + "', \
        things_i_love = '" + req.body.thingsilove + "', \
        find_me_in = '" + req.body.findmein + "' \     WHERE userId = '"+ req.body.userId +"'";
  con.query(sql,(err,rows,fields) => {  
    if (!err) {
      if(rows != '') {
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = req.body.username;
          currentUser = req.session.user;
          console.log('user', req.session.user);
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Login!");
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Database Error!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
}

function bizprofile(req, res) {
    console.log("Inside Update Restaurant Profile Post Request");  
  console.log("Req Body : ",req.body);    
  var sql = "UPDATE restaurant SET \
        name = '" + req.body.name + "', \
        description = '" + req.body.description + "', \
        address = '" + req.body.address + "', \
        timing = '" + req.body.timing	 + "', \
        website = '" + req.body.website	+ "', \
        phonenumber = '" + req.body.phonenumber + "' WHERE restaurantId = "+ req.body.restaurantId ;      
        
  con.query(sql,(err,rows,fields) => {  
    if (!err) {
      if(rows != '') {
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          req.session.user = req.body.username;
          currentUser = req.session.user;
          console.log('user', req.session.user);
          res.writeHead(200,{
              'Content-Type' : 'text/plain'
          })
          res.end("Successful Insert!");
      }
      else {
           res.writeHead(401,{
              'Content-Type' : 'text/plain'
          })
          res.end("Database Error!");
      }
      console.log(rows); }
    else
      console.log(err);
  });
}

function updateorder(req, res) {
  console.log("Inside Update Order Profile Post Request");  
console.log("Req Body : ",req.body);    
var sql = "UPDATE orders SET \
      delieveryStatus = '" + req.body.delieveryStatus + "', \
      orderFilter = '" + req.body.orderFilter + "' WHERE orderId = "+ req.body.orderId + " AND restaurantId = " +   req.body.restaurantId ; 
      
con.query(sql,(err,rows,fields) => {  
  if (!err) {
    if(rows != '') {
      res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        req.session.user = req.body.username;
        currentUser = req.session.user;
        console.log('user', req.session.user);
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful Insert!");
    }
    else {
         res.writeHead(401,{
            'Content-Type' : 'text/plain'
        })
        res.end("Database Error!");
    }
    console.log(rows); }
  else
    console.log(err);
});
}

module.exports = {
    userprofile,
    bizprofile,
    updateorder
}