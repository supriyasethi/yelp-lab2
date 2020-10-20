"use strict";
const express = require("express");
const router = express.Router();
const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');
//const auth = require('../middleware/auth');

//router.use(auth);
//Route to handle Post Request Call
//router.post("/event", insertController.insertevent);

//router.post("/eventregister", insertController.inserteventregister);

//Route to handle Post insertMenu Request Call
router.post("/menu/:id", async (req, res) => {
	console.log("Inside update menu route");
	//console.log(req.body);

	var insertmenu = {
		dishname: req.body.dishname,
		ingredients: req.body.ingredients,
		price: req.body.price,
		description: req.body.description,
		category: req.body.category,
	};
	console.log(insertmenu);
	try {
		await Restaurants.updateOne(
			{ _id: req.params.id },
			{ $push: { menu: insertmenu } },
			function (error, data) {
				if (error) {
					// res.writeHead(500, {
					//     'Content-Type': 'text/plain'
					// })
					console.log("error", error);
					res.json(500).send(error);
				} else {
					// res.writeHead(200, {
					//     'Content-Type': 'text/plain'
					// })
					console.log("data", data);
					res.status(200).json(data);
				}
			}
		);
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
});

//Route to handle Post insert Orders Request Call
router.post("/order/:id", async (req, res) => {
	console.log("Inside update order route");
	//console.log(req.body);

	var insertorder = {
		userid: req.body.userid,
		orderitem: req.body.orderitem,
		delieveryoption: req.body.delieveryoption,
		delieverystatus: req.body.delieverystatus,
		orderstatus: req.body.orderstatus,
	};
	console.log(insertorder);
	try {
		await Restaurants.updateOne(
			{ _id: req.params.id },
			{ $push: { orders: insertorder } },
			function (error, data) {
				if (error) {
					// res.writeHead(500, {
					//     'Content-Type': 'text/plain'
					// })
					console.log("error", error);
					res.json(500).send(error);
				} else {
					// res.writeHead(200, {
					//     'Content-Type': 'text/plain'
					// })
					console.log("data", data);
					res.status(200).json(data);
				}
			}
        );        
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
});

//Route to handle Post insert Orders Request Call
router.post("/review/:id", async (req, res) => {
	console.log("Inside update review route");
	//console.log(req.body);

	var insertreview = {
		userid: req.body.userid,
		review: req.body.review,
		rating: req.body.rating		
	};
	console.log(insertreview);
	try {
		await Restaurants.updateOne(
			{ _id: req.params.id },
			{ $push: { reviews: insertreview }} ,{upsert: true},
			function (error, data) {
				if (error) {
					// res.writeHead(500, {
					//     'Content-Type': 'text/plain'
					// })
					console.log("error", error);
					res.json(500).send(error);
				} else {
					// res.writeHead(200, {
					//     'Content-Type': 'text/plain'
					// })
					console.log("data", data);
					res.status(200).json(data);
				}
			}
        );        
	} catch (error) {
		console.log("error", error);
		res.send(error);
	}
});


//router.post("/reviews", insertController.insertreviews);

module.exports = router;
