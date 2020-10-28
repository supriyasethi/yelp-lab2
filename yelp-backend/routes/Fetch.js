//"use strict";
const express = require('express');
const router = express.Router();
const {fetchHomeBiz, fetchBiz, fetchUser} = require("../controller/fetch");


router.get('/home', async(req, res) => {
    console.log('Inside fetch home biz route');
    const value = await fetchHomeBiz(req, res);
    return value;
});   

router.get('/userp',  async(req, res) => {
    console.log('Inside fetch home biz route');
    const value = await fetchUser(req, res);
    return value;
});  

router.get('/bizp',  async(req, res) => {
    console.log('Inside fetch home biz route');
    const value = await fetchBiz(req, res);
    return value;
});   

module.exports = router;