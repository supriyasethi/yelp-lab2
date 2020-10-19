const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Restaurant = new Schema({
    name: {type: String, required: true},
    city:  {type: String, required: false},
    description: {type: String, required: false},
    address: {type: String, required: false},
    timing:{type: String, required: false},
    emailid:{type: String, required: false},
    website: {type: String, required: false},    
    phonenumber: {type: String, required: true},
    login: {
        username: {type: String, required: true},
        password: {type: String, required: true}
    },
    menu: [{
        dishname: {type: String, required: false},
        ingredients: {type: String, required: false},
        price: {type: String, required: false},
        description: {type: String, required: false},
        category: {type: String, required: false},
    }],
    orders: [{
        userid: {type: Number, required: false},
        orderitem: {type: String, required: false},
        delieveryoption: {type: String, required: false},
        delieverystatus: {type: String, required: false},
        orderstatus: {type: String, required: false},
    }],
    reviews: [{
        userid: {type: Number, required: false},
        review: {type: String, required: false},
        rating: {type: String, required: false},
    }],
    events: [{
        name: {type: String, required: false},
        description: {type: String, required: false},
        time: {type: String, required: false},
        date: {type: Date, required: false},
        location: {type: String, required: false},
        hashtags: {type: String, required: false},
        usersregistered: [{
            userid: {type: Number, required: false},
            userfirstname: {type: String, required: false},
            userlastname: {type: String, required: false},
        }]
    }]

},
{
    versionKey: false
});

const bizModel = mongoose.model('restaurant', Restaurant);
module.exports = bizModel;