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

//Route to handle Post insertMenu Request Call
router.post('/menu/:id', (req, res) => {
    
    
});

module.exports = router;



var Update_menu = [];
    Update_menu.push({
        dishname: req.body.dishname,
        ingredients: req.body.ingredients,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
        });

    var json_menu = {
        setmenu: Update_menu
    };
    console.log('Inside update menu route');
    //console.log(req.body);
    const updatedMenu = Restaurants.findOne(
        //{ _id : ObjectId(req.body.id) },
        { _id : req.params.id })
        .then(function(restaurant)
        { restaurant.menu.push(Update_menu);
        });
            // "menu.dishname": req.body.dishname,
            // ingredients: req.body.ingredients,
            // price: req.body.price,
            // description: req.body.description,
            // category: req.body.category
        //}}, {new:true}
    //);
    console.log(updatedMenu);
    try {
    await updatedMenu.save((error, data) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.send(error);
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.json(data);
        }
    })    
  }
  catch(error) {
      res.send(error);
  }