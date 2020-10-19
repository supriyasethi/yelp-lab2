"use strict";
const express = require('express');
const router = express.Router();
var con = require('../connection');
const mysql = require('mysql');
const insertController = require("../controller/insert");
//const auth = require('../middleware/auth');

//router.use(auth);
//Route to handle Post Request Call
router.post('/event', insertController.insertevent);     

router.post('/eventregister', insertController.inserteventregister);

//Route to handle Post insertMenu Request Call
router.post('/menu', insertController.insertmenu); 

router.post('/order', insertController.insertorder); 

router.post('/reviews', insertController.insertreviews);


module.exports = router;