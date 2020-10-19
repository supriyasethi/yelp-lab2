const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
    firstname: {type: String, required: true},
    lastname:  {type: String, required: true},
    dateofbirth: {type: Date, required: false},
    city: {type: String, required: false},
    state:{type: String, required: false},
    country:{type: String, required: false},
    nickname: {type: String, required: false},
    gender: {type: String, required: false},
    emailid: {type: String, required: true},
    phonenumber: {type: String, required: true},
    yelpingsince: {type: String, required: false},
    thingsilove: {type: String, required: false},
    findmein: {type: String, required: false},
    login: {
        username: {type: String, required: true},
        password: {type: String, required: true}
    },
    orders: [{
        restaurantid: {type: Number, required: false},
        orderitem: {type: String, required: false},
        delieveryoption: {type: String, required: false},
        delieverystatus: {type: String, required: false},
        orderstatus: {type: String, required: false},
    }],
    reviews: [{
        restaurantid: {type: Number, required: false},
        review: {type: String, required: false},
        rating: {type: String, required: false},
    }],
    events: [{
        restaurantid: {type: Number, required: false},
        name: {type: String, required: false},
        description: {type: String, required: false},
        time: {type: String, required: false},
        date: {type: Date, required: false},
        location: {type: String, required: false},
        hashtags: {type: String, required: false},        
    }]
},
{
    versionKey: false
});

const userModel = mongoose.model('user', User);
module.exports = userModel;