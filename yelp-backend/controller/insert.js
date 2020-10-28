const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');

function insertEvent(req, res) {
	console.log("Inside Insert Event Post Request");
	console.log("Req Body : ", req.body);
	var insertevent = {
		name: req.body.name,
        description: req.body.description,
        time: req.body.time,
        date: req.body.date,
        location: req.body.location,
        hashtags: req.body.hashtags
	};
	console.log(insertevent);
	try {
		 Restaurants.updateOne(
			{ _id: req.params.id },
			{ $push: { events: insertevent }} ,{upsert: true},
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

function userRegister(req, res) {
	var insertuserRestaurant = {
		userid: req.params.userid,
        userfirstname: req.body.firstname,
        userlastname: req.body.lastname
	};
	var inserteventUser = {
		name: req.body.name,
        description: req.body.description,
        time: req.body.time,
        date: req.body.date,
        location: req.body.location,
        hashtags: req.body.hashtags
	};
	console.log(insertuserRestaurant);
	try {
		 Restaurants.updateOne(
			{ _id: req.params.resid , 'events.name': req.body.eventname},
			{ $push: { usersregistered: insertuserRestaurant }} ,{upsert: true},
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
		   { _id: req.params.userid},
		   { $push: { events: inserteventUser }} ,{upsert: true},
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

function insertMenu(req, res) {
	console.log("Inside Insert Menu Post Request");
	console.log("Req Body : ", req.body);
	
	var insertmenu = {
		dishname: req.body.dishname,
		ingredients: req.body.ingredients,
		price: req.body.price,
		description: req.body.description,
		category: req.body.category,
	};
	console.log(insertmenu);
	try {
		 Restaurants.updateOne(
			{ _id: req.params.id },
			{ $push: { menu: insertmenu } },
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

function insertReview(req, res) {
	console.log("Inside Insert Reviews Post Request");
	console.log(req.body);
	var insertreviewRestaurant = {
		userid: req.params.userid,
		review: req.body.review,
		rating: req.body.rating		
	};

	var insertreviewUser = {
		restaurantid: req.params.resid,
		review: req.body.review,
		rating: req.body.rating		
	};
	console.log(insertreviewRestaurant);
	try {
		 Restaurants.updateOne(
			{ _id: req.params.resid },
			{ $push: { reviews: insertreviewRestaurant }} ,{upsert: true},
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
		   { _id: req.params.userid },
		   { $push: { reviews: insertreviewUser }} ,{upsert: true},
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

function insertOrder(req, res) {
	console.log("Inside Insert Order Post Request");
	console.log(req.body);
	
	var insertorderRestaurant = {
		userid: req.params.userid,
		orderitem: req.body.orderitem,
		delieveryoption: req.body.delieveryoption,
		delieverystatus: req.body.delieverystatus,
		orderstatus: req.body.orderstatus,
	};

	var insertorderUser = {
		restaurantid: req.params.resid,
		orderitem: req.body.orderitem,
		delieveryoption: req.body.delieveryoption,
		delieverystatus: req.body.delieverystatus,
		orderstatus: req.body.orderstatus,
	};
	console.log(insertorderRestaurant);
	try {
		 Restaurants.updateOne(
			{ _id: req.params.resid },
			{ $push: { orders: insertorderRestaurant } },
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
		   { _id: req.params.resid },
		   { $push: { orders: insertorderUser } },
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
	insertEvent,
	insertMenu,
	userRegister,
	insertReview,
	insertOrder,
};
