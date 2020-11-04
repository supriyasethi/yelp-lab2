//"use strict";
const express = require('express');
const router = express.Router();
const {fetchHomeBiz, fetchBiz, fetchUser, fetchEvent, fetchEvents, fetchUsersList} = require("../controller/fetch");
const {checkAuth} = require("../utils/passport");


router.get('/home', async(req, res) => {
    console.log('Inside fetch home biz route');
    const value = await fetchHomeBiz(req, res);
    return value;
});   

router.get('/userp',  async(req, res) => {
    console.log('Inside  user profile route');
    const value = await fetchUser(req, res);
    return value;
});  

router.get('/users',  async(req, res) => {
    console.log('Inside user list route');
    const value = await fetchUsersList(req, res);
    return value;
});  

router.get('/bizp', async(req, res) => {
    console.log('Inside restaurant profile route');
    const value = await fetchBiz(req, res);
    return value;
});   

router.get('/event', async(req, res) => {
    console.log('Inside fetch event route');
    const value = await fetchEvent(req, res);
    return value;
});

router.get('/events', async(req, res) => {
    console.log('Inside fetch events route');
    const value = await fetchEvents(req, res);
    return value;
});

router.get('/messages', async(req, res) => {
    console.log('Inside fetch messages route');
    const value = await fetchMessages(req, res);
    return value;
});

module.exports = router;