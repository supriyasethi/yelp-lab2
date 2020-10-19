"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
var passwordHash = require('password-hash');
//require express validation to validate the fields
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
//const loginController = require("../controller/login");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

//Route to handle user Signup
router.post("/user", async (req, res) => {
	console.log('Inside user signup route');    
	let hashedPassword = passwordHash.generate(req.body.login.password);	
    console.log(hashedPassword);
	const userdata = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		dateofbirth: req.body.birthday,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		nickname: req.body.nickname,
		gender: req.body.gender,
		emailid: req.body.username,
		phonenumber: req.body.phonenumber,
		yelpingsince: req.body.yelpingsince,
		thingsilove:req.body.thingsilove,
		findmein: req.body.findmein,
		login: {
			username: req.body.login.username,
			password: hashedPassword,
		},
	});
	try {
		await User.findOne({emailid: req.body.username}, (error, user) => {
			if(error) {
				res.status(500).end();
			}
			if(user) {
				res.status(400).json({message: 'Username already exists!'})
			}
			else {
				userdata.save((error, data) => {
					if (error) {
						res.writeHead(500, {
							'Content-Type': 'text/plain'
						})
						res.send(error);
					}
					else {
						res.writeHead(200, {
							'Content-Type': 'text/plain'
						})
						res.json(data);
					}
				})
		}
	});        
} catch(err) {
        res.json({message: err});
    }
});

//Route to handle restaurant Signup
router.post("/biz", async (req, res) => {
	console.log('Inside biz signup route');    
	let hashedPassword = passwordHash.generate(req.body.login.password);
	console.log(req.body);
    console.log(hashedPassword);
	const bizdata = new Restaurant({
		name: req.body.name,
		city: req.body.city,
		description: req.body.description,
		address: req.body.address,
		timing: req.body.timing,		
		emailid: req.body.username,
		website: req.body.website,
		phonenumber: req.body.phonenumber,		
		login: {
			username: req.body.login.username,
			password: hashedPassword,
		},
	});
	try {
		await Restaurant.findOne({emailid: req.body.username}, (error, bizuser) => {
			if(error) {
				res.status(500).end();
			}
			if(bizuser) {
				res.status(400).json({message: 'Username already exists!'})
			}
			else {
				bizdata.save((error, data) => {
					if (error) {
						res.writeHead(500, {
							'Content-Type': 'text/plain'
						})
						res.send(error);
					}
					else {
						res.writeHead(200, {
							'Content-Type': 'text/plain'
						})
						res.json(data);
					}
				})
		}
	});
 } catch(err) {
        res.json({message: err});
    }
});


module.exports = router;
