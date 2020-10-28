"use strict";
const express = require("express");
const router = express.Router();
const { insertMenu, insertOrder, insertReview, insertEvent, userRegister } = require('../controller/insert');

//Route to handle Post insertMenu Request Call
router.post("/menu/:id", async (req, res) => {
	console.log("Inside insert menu route");
	const value = await insertMenu(req,res);
	return value;
});

//Route to handle Post insert Orders Request Call
router.post("/order/:id", async (req, res) => {
	console.log("Inside insert order route");
	const value = await insertOrder(req,res);
	return value;
});

//Route to handle Post insert Reviews Request Call
router.post("/review/:id", async (req, res) => {
	console.log("Inside insert review route");
	const value = await insertReview(req,res);
	return value;	
});

//Route to handle Post insert Events Request Call
router.post("/event/:id", async (req, res) => {
	console.log("Inside insert event route");	
	const value = await insertEvent(req,res);
	return value;
	
});

//Route to handle Post insert Events Request Call
router.post("/userregister/:id", async (req, res) => {
	console.log("Inside insert event user register route");
	const value = await userRegister(req,res);
	return value;
	
});

module.exports = router;
