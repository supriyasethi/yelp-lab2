"use strict";
const express = require("express");
const router = express.Router();
var passwordHash = require('password-hash');

//require express validation to validate the fields
const auth = require("../middleware/auth");
const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');


//Route to handle Post Request Call
router.post('/user', async (req, res) => {
	console.log('Inside user login route');    
	try {
		const user = await Users.findOne({ "login.username": req.body.username});
		console.log(user);
		if(passwordHash.verify(req.body.password, user.login.password)) {
            res.cookie('cookie', user.username, { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = user;            
			res.status(200).json(user);
		}
		else res.status(401).json({message: "Invalid Credentials"});
	}	
	catch(error) {
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		})
		res.json({message:"Error Occured"});
	}
})		

//Route to handle Post Request Call
router.post('/biz', async (req, res) => {
	console.log('Inside biz login route');    
	try {
		const biz = await Restaurants.findOne({ "login.username": req.body.username});
		console.log(biz);
		if(passwordHash.verify(req.body.password, biz.login.password)) {
			console.log('inside if');
            res.cookie('cookie', biz.username, { maxAge: 900000, httpOnly: false, path: '/' });
            //req.session.user = user;            
			res.status(200).json(biz);
		}
		else res.status(401).json({message: "Invalid Credentials"});
	}	
	catch(error) {		
		console.log(error);
		res.status(500).json({message:"Error Occured"});
	}
})		

module.exports = router;
