"use strict";
const express = require("express");
const router = express.Router();
//const {signupUser, signupBiz} = require('../controller/signup');
var kafka = require('../kafka/client');

//Route to handle user Signup
router.post("/user", async (req, res) => {
	console.log("Inside user signup route");
	// const value = await signupUser(req, res);
	// return value;
	kafka.make_request('user_signup',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });
                res.end();
            }
        
    });
});

//Route to handle restaurant Signup
router.post("/biz", async (req, res) => {
	console.log("Inside biz signup route");
	// const value = await signupBiz(req, res);
	// return value;
	kafka.make_request('biz_signup',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });
                res.end();
            }
        
    });
});

module.exports = router;
