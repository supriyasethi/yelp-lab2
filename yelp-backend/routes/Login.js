"use strict";
const express = require("express");
const router = express.Router();
var passwordHash = require('password-hash');
//require express validation to validate the fields
//const auth = require("../middleware/auth");
const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');
const { auth } = require("../utils/passport");
auth();


//Route to handle Post Request Call
router.post('/user', async (req, res) => {
	console.log('Inside user login route');    
	try {
		const user = await Users.findOne({ "login.username": req.body.username});		
		if(passwordHash.verify(req.body.password, user.login.password)) {
            //res.cookie('cookie', user.username, { maxAge: 900000, httpOnly: false, path: '/' });
			//req.session.user = user;     			
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
})		

//Route to handle Post Request Call
router.post('/biz', async (req, res) => {
	console.log('Inside biz login route');    
	try {
		const biz = await Restaurants.findOne({ "login.username": req.body.username});
		console.log(biz);
		if(passwordHash.verify(req.body.password, biz.login.password)) {			
            //res.cookie('cookie', biz.username, { maxAge: 900000, httpOnly: false, path: '/' });
			//req.session.user = user;            
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
})		

module.exports = router;
