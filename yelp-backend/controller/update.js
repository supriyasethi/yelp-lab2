var express = require("express");
const Users = require("../models/User");
const Restaurants = require("../models/Restaurant");

function updateUser(req, res) {
	console.log("Inside Update User Profile Post Request");
	console.log("Req Body : ", req.body);
	try {
		Users.updateOne(
			{ _id: req.params.userid },
			{
				$set: {
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					dateofbirth: req.body.birthday,
					city: req.body.city,
					state: req.body.state,
					country: req.body.country,
					nickname: req.body.nickname,
					gender: req.body.gender,
					emailid: req.body.emailid,
					phonenumber: req.body.phonenumber,
					yelpingsince: req.body.yelpingsince,
					thingsilove: req.body.thingsilove,
					findmein: req.body.findmein,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					console.log("error", error);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
}

function updateBiz(req, res) {
	console.log("Inside Update Restaurant Profile Post Request");
	console.log("Req Body : ", req.body);
	try {
		Restaurants.updateOne(
			{ _id: req.params.resid },
			{
				$set: {
					name: req.body.name,
					city: req.body.city,
					description: req.body.description,
					address: req.body.address,
					timing: req.body.timing,
					emailid: req.body.emailid,
					website: req.body.website,
					phonenumber: req.body.phonenumber,
				},
			},
			{ upsert: true },
			function (error, data) {
				if (error) {
					console.log("error", error);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
}

function updateOrder(req, res) {
	console.log("Inside Update Order Profile Post Request");
	console.log("Req Body : ", req.body);

	try {
		Restaurants.updateOne(
			{ _id: req.params.resid, "orders._id": req.params.orderid },
			{
				$set: {
					"orders.delieverystatus": req.body.delieverystatus,
					"orders.orderstatus": req.body.orderstatus,
				},
			},
			function (error, data) {
				if (error) {
					console.log("error", error);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}

	try {
		Users.updateOne(
			{ _id: req.params.userid, "orders.restaurantid": req.params.resid },
			{
				$set: {
					"orders.delieverystatus": req.body.delieverystatus,
					"orders.orderstatus": req.body.orderstatus,
				},
			},
			function (error, data) {
				if (error) {
					console.log("error", error);
					res.json(500).send(error);
				} else {
					console.log("data", data);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
}

module.exports = {
	updateUser,
	updateBiz,
	updateOrder,
};
