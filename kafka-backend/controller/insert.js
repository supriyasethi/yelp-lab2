const Users = require("../models/User");
const Restaurants = require("../models/Restaurant");
const Events = require("../models/Event");
const UserFollows = require("../models/UserFollow");
const Messages = require("../models/Messages");

async function handle_request(msg, callback) {
	//async function insertEvent(req, res) {
	let response = {};
	switch (msg.api) {
		case "insert_event": {
			console.log("Inside Insert Event Post Request");
			console.log("Req Body : ", msg);
			let message = msg.data;
			const eventdata = new Events({
				name: message.eventname,
				description: message.description,
				time: message.time,
				date: message.date,
				location: message.location,
				hashtags: message.hashtags,
				restaurantId: message.resid,
			});

			try {
				await eventdata.save((error, data) => {
					if (error) {
						console.log("error", error);
						response.status = 500;
						response.data = "Network Error";
						callback(null, response);
						//res.json(500).send(error);
					} else {
						console.log("data", data);
						response.status = 200;
						response.data = data;
						callback(null, response);
						//res.status(200).json(data);
					}
				});
			} catch (error) {
				console.log("error", error);
				response.status = 500;
				response.data = error;
				callback(null, response);
				//res.send(error);				
			}
			break;
		}

		//async function userRegister(req, res) {
		case "insert_userregister": {
			let message = msg.data;
			var insertUserRegister = {
				userid: message.userid,
				userfirstname: message.firstname,
				userlastname: message.lastname,
			};
			var inserteventUser;

			console.log(insertUserRegister);
			try {
				await Events.findOneAndUpdate(
					{ _id: message.eventid },
					{ $addToSet: { usersregistered: insertUserRegister } },
					{ upsert: true },
					function (error, data) {
						if (error) {
							console.log("error", error);
							response.status = 500;
							response.data = "Network Error";
							callback(null, response);
							//res.json(500).send(error);
						} else {
							console.log("data", data);
							response.status = 200;
							response.data = data;
							callback(null, response);
							//res.status(200).json(data);
						}
					}
				);
			} catch (error) {
				console.log("error", error);
				response.status = 500;
				response.data = error;
				callback(null, response);
				//res.send(error);
			}
			break;
		}

		//async function userFollow(req, res) {
		case "insert_userfollow": {
			let message = msg.data;
			const userfollowdata = new UserFollows({
				userid: message.userid,
				firstname: message.firstname,
				lastname: message.lastname,
				city: message.city,
				state: message.state,
				yelpingsince: message.yelpingsince,
				thingsilove: message.thingsilove,
				findmein: message.findmein,
			});

			try {
				await UserFollows.findOne({ userid: message.userid }, (error, user) => {
					if (error) {
						console.log("error", error);
						response.status = 500;
						response.data = "Network Error";
						callback(null, response);
						//res.json(500).send(error);
					}
					if (user) {
						console.log("inside user", user);
						response.status = 200;
						response.data = "You are already following this user!";
						callback(null, response);
						// res
						// 	.status(200)
						// 	.json({ message: "You are already following this user!" });
					} else {
						userfollowdata.save((error, data) => {
							if (error) {
								console.log("error", error);
								res.json(500).send(error);
							} else {
								console.log("data", data);
								console.log("inside user", user);
								response.status = 200;
								response.data = "You are now following this user!";
								callback(null, response);
								// res
								// 	.status(200)
								// 	.json({ message: "You are now following this user!" });
							}
						});
					}
				});
			} catch (error) {
				response.status = 500;
				response.data = error;
				callback(null, response);
				//res.json({ message: err });
			}
			break;
		}

		//async function insertMenu(req, res) {
		case "insert_menu": {
			let message = msg.data;
			console.log("Inside Insert Menu Post Request");
			console.log("Req Body : ", message);
			console.log("Req Query : ", msg);

			var insertmenu = {
				dishname: message.dishname,
				ingredients: message.ingredients,
				price: message.price,
				description: message.description,
				category: message.category,
			};
			console.log(insertmenu);
			try {
				await Restaurants.findOneAndUpdate(
					{ _id: message.resId },
					{ $addToSet: { menu: insertmenu } },
					function (error, data) {
						if (error) {
							console.log("error", error);
							response.status = 500;
							response.data = "Network Error";
							callback(null, response);
							//res.json(500).send(error);
						} else {
							console.log("data", data);
							response.status = 200;
							response.data = data;
							callback(null, response);
							//res.status(200).json(data);
						}
					}
				);
			} catch (error) {
				console.log("error", error);
				response.status = 500;
				response.data = error;
				callback(null, response);
				//res.send(error);
			}
			break;
		}

		//async function insertReview(req, res) {
		case "insert_review": {
			let message = msg.data;
			console.log("Inside Insert Reviews Post Request");
			console.log(message);
			var insertreviewRestaurant = {
				userid: message.userid,
				username: message.username,
				review: message.review,
				rating: message.rating,
			};

			var insertreviewUser = {
				restaurantid: message.resid,
				review: message.review,
				rating: message.rating,
			};
			console.log(insertreviewRestaurant);
			var query1 = { _id: message.resid };
			var query2 = { _id: message.userid };
			var update1 = {
				$addToSet: { reviews: insertreviewRestaurant },
			};
			var update2 = {
				$addToSet: { reviews: insertreviewUser },
			};
			var options = { safe: true, upsert: true };
			try {
				const restaurantPromise = await Restaurants.findOneAndUpdate(
					query1,
					update1,
					options
				);
				const userPromise = await Users.findOneAndUpdate(
					query2,
					update2,
					options
				);
				response.status = 200;
				response.data = { restaurantPromise, userPromise };
				return callback(null, response);
				//res.status(200).json({ restaurantPromise, userPromise });
			} catch (error) {
				response.status = 500;
				response.data = error;
				return callback(null, error);
				//res.status(500).json(err);
			}
			break;
		}

		//async function insertOrder(req, res) {
		case "insert_order": {
			let message = msg.data;
			console.log("Inside Insert Order Post Request");
			console.log(message);

			var insertorderRestaurant = {
				userid: message.userid,
				username: message.username,
				orderitem: message.orderitem,
				delieveryoption: message.delieveryoption,
				delieverystatus: message.delieverystatus,
				orderstatus: message.orderstatus,
			};

			var insertorderUser = {
				restaurantid: message.resid,
				restaurantname: message.restaurantname,
				orderitem: message.orderitem,
				delieveryoption: message.delieveryoption,
				delieverystatus: message.delieverystatus,
				orderstatus: message.orderstatus,
			};
			console.log(insertorderRestaurant);
			var query1 = { _id: message.resid };
			var query2 = { _id: message.userid };
			var update1 = {
				$addToSet: { orders: insertorderRestaurant },
			};
			var update2 = {
				$addToSet: { orders: insertorderUser },
			};
			var options = { safe: true, upsert: true };
			try {
				const restaurantPromise = await Restaurants.findOneAndUpdate(
					query1,
					update1,
					options
				);
				const userPromise = await Users.findOneAndUpdate(
					query2,
					update2,
					options
				);
				response.status = 200;
				response.data = { restaurantPromise, userPromise };
				return callback(null, response);
				//return res.status(200).json({ restaurantPromise, userPromise });
			} catch (error) {
				response.status = 500;
				response.data = error;
				return callback(null, error);
				//return res.status(500).json(err);
			}
			break;
		}

		//async function insertMessage(req, res) {
		case "insert_messages": {
			let message = msg.data;
			console.log("Inside Insert Message Post Request");
			console.log("Req Body : ", message);

			const insertmessage = {
				message: message.messages.message,
				role: message.messages.role,
			};

			const messagedata = new Messages({
				messages: {
					message: message.messages.message,
					role: message.messages.role,
				},
				user: message.user,
				userid: message.userid,
				restaurant: message.restaurant,
				restaurantid: message.restaurantid,
				date: message.date,
			});

			try {
				await Messages.find(
					{ _id: message.messageid },
					{ userid: message.userid },
					{ restaurantid: message.restaurantid },
					(error, message) => {
						if (error) {
							response.status(500);
							response.data = "DB not connected !";
							callback(null, response);
						}
						if (message) {
							console.log(message);
							console.log("inside update only message");
							console.log(message.length);
							if (message.length > 0) {
								//updateOnlyMessage(insertmessage, message.messageid);
								Messages.findOneAndUpdate(
									{ _id: message.messageid },
									{ $addToSet: { messages: insertmessage } },
									{ safe: true, upsert: true },
									function (error, data) {
										if (error) {
											console.log("error", error);
											response.status = 500;
											response.data = error;
											callback(null, response);
											//res.json(500).send(error);
										} else {
											console.log("data", data);
											response.status = 200;
											response.data = JSON.stringify(data);
											callback(null, response);
											//res.status(200).json(data);
										}
									}
								);
							} else {
								console.log("inside error");
								messagedata.save((error, data) => {
									if (error) {
										console.log("error", error);
										response.status = 500;
										response.data = "Network Error";
										callback(null, response);
										//res.json(500).send(error);
									} else {
										console.log("data", data);
										response.status = 200;
										response.data = data;
										callback(null, response);
										//res.status(200).json(data);
									}
								});
							}
						}
					}
				);
			} catch (error) {
				console.log(err);
				console.log("error", error);
				response.status = 500;
				response.data = error;
				callback(null, response);
				//callback(null,err);
				//res.json({message: err});
			}
			break;
		}
	}
}

module.exports = {
	handle_request,
	// insertEvent,
	// insertMenu,
	// userRegister,
	// insertReview,
	// insertOrder,
	// userFollow,
	// insertMessage,
};
