"use strict";
const express = require("express");
const router = express.Router();
const {loginUser, loginBiz} = require('../controller/login');

//Route to handle Post Request Call
router.post("/user", async (req, res) => {
	console.log("Inside user login route");
	const value = await loginUser(req, res);
	return value;
});

//Route to handle Post Request Call
router.post("/biz", async (req, res) => {
	console.log("Inside biz login route");
	const value = await loginBiz(req, res);
	return value;
});

module.exports = router;
