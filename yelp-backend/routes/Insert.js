"use strict";
const express = require("express");
const router = express.Router();
const { insertMenu, insertOrder, insertReview, insertEvent, userRegister, userFollow } = require('../controller/insert');

//Route to handle Post insertMenu Request Call
router.post("/menu/", async (req, res) => {
	console.log("Inside insert menu route");
	const value = await insertMenu(req,res);
	return value;
});

//Route to handle Post insert Orders Request Call
router.post("/order", async (req, res) => {
	console.log("Inside insert order route");
	const value = await insertOrder(req,res);
	return value;
});

//Route to handle Post insert Reviews Request Call
router.post("/review/", async (req, res) => {
	console.log("Inside insert review route");
	const value = await insertReview(req,res);
	return value;	
});

//Route to handle Post insert Events Request Call
router.post("/event/", async (req, res) => {
	console.log("Inside insert event route");	
	const value = await insertEvent(req,res);
	return value;
	
});

//Route to handle Post insert Events Request Call
router.post("/userregister/", async (req, res) => {
	console.log("Inside insert event user register route");
	const value = await userRegister(req,res);
	return value;
	
});


//Route to handle Post insert Events Request Call
router.post("/userfollow/", async (req, res) => {
	console.log("Inside insert user follow  route");
	const value = await userFollow(req,res);
	return value;
	
});
module.exports = router;
