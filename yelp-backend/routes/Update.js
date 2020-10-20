"use strict";
const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');
const {ObjectId} = require("mongodb");



//const auth = require('../middleware/auth');

//router.use(auth);
//Route to handle Post Login Request Call
//router.post('/userprofile', updateController.userprofile);  

//Route to handle Post update biz profile Request Call
//router.post('/bizprofile', updateController.bizprofile);  

//router.post('/order', updateController.updateorder); 


module.exports = router;





    
    