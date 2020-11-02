"use strict";
const express = require("express");
const router = express.Router();
const {updateUser, updateBiz, updateOrders} = require('../controller/update');

//Route to handle Post Update user profile Request Call
router.post("/userprofile", async (req, res) => {
	console.log("Inside update user profile route");
	const value = await updateUser(req, res);
	return value;
});

//Route to handle Post Update biz profile Request Call
router.post("/bizprofile", async (req, res) => {
	console.log("Inside update user profile route");
	const value = await updateBiz(req, res);	
	return value;
});

//Route to handle Post Update orders Request Call
router.post("/orders", async (req, res) => {
	console.log("Inside update user profile route");
	const value = await updateOrders(req, res);	
	return value;
});

module.exports = router;
