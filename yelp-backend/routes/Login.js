"use strict";
const express = require("express");
const router = express.Router();
var config = require("../utils/config.js");
//const {loginUser, loginBiz} = require('../controller/login');
var kafka = require("../kafka/client");

//Route to handle Post Request Call
router.post("/user", async (req, res) => {
	console.log("Inside user login route");
	const data = {
		api: "login_user",
		data: req.body,
	};
	kafka.make_request(config.login_topic, data, function (err, results) {
		if (err) {
			console.log("Inside err");
			res.status(500);
			res.json({
				status: "error",
				msg: "System Error, Try Again.",
			});
			res.end();
		} else {
			console.log("inside else of request");

			res.status(results.status);
			// res.json(results.data);
			res.end(results.data);
		}
		return res;
	});
	// const value = await loginUser(req, res);
	// return value;
});

//Route to handle Post Request Call
router.post("/biz", async (req, res) => {
	console.log("Inside biz login route");
	const data = {
		api: "login_biz",
		data: req.body,
	};
	kafka.make_request(config.login_topic, data, function (err, results) {
		if (err) {
			console.log("Inside err");
			res.status(500);
			res.json({
				status: "error",
				msg: "System Error, Try Again.",
			});
			res.end();
		} else {
			console.log("inside else of request");

			res.status(results.status);
			// res.json(results.data);
			res.end(results.data);
		}
		return res;
	});
	// const value = await loginBiz(req, res);
	// return value;
});

module.exports = router;
