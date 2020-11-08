var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Signup = require('./controller/signup.js');
var Login = require('./controller/login.js');
var Insert = require('./controller/insert.js');
var Update = require('./controller/update.js');
var Fetch = require('./controller/fetch.js');
var config = require('./utils/config.js');
//var Books = require('./services/books.js');
const { mongoDB} = require('./utils/config');
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,    
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest(config.signup_topic, Signup);
handleTopicRequest(config.login_topic, Login);
handleTopicRequest(config.insert_topic, Insert);
handleTopicRequest(config.update_topic, Update);
handleTopicRequest(config.fetch_topic, Fetch);

