"use strict";
const express = require("express");
const router = express.Router();
const {signupUser, signupBiz} = require('../controller/signup');

//Route to handle user Signup
router.post("/user", async (req, res) => {
	console.log("Inside user signup route");
	const value = await signupUser(req, res);
	return value;
});

//Route to handle restaurant Signup
router.post("/biz", async (req, res) => {
	console.log("Inside biz signup route");
	const value = await signupBiz(req, res);
	return value;
});

module.exports = router;
