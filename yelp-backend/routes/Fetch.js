//"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fetchController = require("../controller/fetch");


router.get('/home', fetchController.fetchhome);   

router.get('/menu', fetchController.fetchmenu);

router.get('/event', fetchController.fetchevent);

router.get('/events', fetchController.fetchevents);

router.get('/eventkey', fetchController.fetcheventkey);

router.get('/userp', fetchController.fetchuserp);  

router.get('/bizp', fetchController.fetchbizp);   

router.get('/bizlist', fetchController.fetchbizlist);   

router.get('/orders', fetchController.fetchorders);

router.get('/vieworder', fetchController.fetchorder);

router.get('/reviews', fetchController.fetchreviews);

module.exports = router;