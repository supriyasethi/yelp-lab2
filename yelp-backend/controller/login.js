"use strict";
const express = require("express");
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');
const { auth } = require("../utils/passport");
var passwordHash = require('password-hash');
auth();

function loginUser(req,res) {
    console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);  
  try {
		const user = Users.findOne({ "login.username": req.body.username});		
		if(passwordHash.verify(req.body.password, user.login.password)) {              			
			const payload = { _id: user._id, username: user.login.username};			
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
			});
            res.status(200).send({token: "JWT " + token, message: "Login Successful"});			
		}
		else res.status(401).json({message: "Invalid Credentials"});
	}	
	catch(error) {			
		res.status(500).send(error);
	}

}

function loginBiz(req,res) {
    console.log("Inside Login Post Request");  
  console.log("Req Body : ",req.body);  
  try {
		const biz = Restaurants.findOne({ "login.username": req.body.username});
		console.log(biz);
		if(passwordHash.verify(req.body.password, biz.login.password)) {			           
			const payload = { _id: biz._id, username: biz.login.username};			
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
			});
            res.status(200).send({token: "JWT " + token, message: "Login Successful"});				
		}
		else res.status(401).json({message: "Invalid Credentials"});
	}	
	catch(error) {				
		res.status(500).json({message:"Error Occured"});
	}  
}

module.exports = {
    loginUser,
    loginBiz
}