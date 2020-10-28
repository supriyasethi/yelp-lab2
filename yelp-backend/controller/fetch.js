const Users = require('../models/User');
const Restaurants = require('../models/Restaurant');
   

function fetchHomeBiz(req,res) {
    console.log("Inside Home Get request"); 
    try {
      const user = await Restaurants.find({ city: req.body.city}, 		
        function (error, data) {
          if (error) {					
            console.log("error", error);
            res.json(500).send(error);
          } else {					
            console.log("data", data);
            res.status(200).json(data);
          }
        });
  }
  catch(error) {			
    res.status(500).send(error);
  }
}

function fetcUser(req,res) {
  console.log("Inside Event Search Get request"); 
  try {
    const user = await Users.findOne({ _id: req.params.userid}, 		
      function (error, data) {
        if (error) {					
          console.log("error", error);
          res.json(500).send(error);
        } else {					
          console.log("data", data);
          res.status(200).json(data);
        }
      });
}
catch(error) {			
  res.status(500).send(error);
}
}

function fetcBiz(req,res) {
  console.log("Inside Event Search Get request");   
 
  try {
    const user = await Restaurants.findOne({ _id: req.params.resid}, 		
      function (error, data) {
        if (error) {					
          console.log("error", error);
          res.json(500).send(error);
        } else {					
          console.log("data", data);
          res.status(200).json(data);
        }
      });
}
catch(error) {			
  res.status(500).send(error);
}
}
    
function fetchmenu(req, res) {
  console.log("Inside Menu Get request"); 
  console.log(req.session.restaurantId); 
  let restaurantId = req.query.restaurantId;
  var sql = 
    mysql.format("SELECT * FROM restaurant A INNER JOIN menu B \
          ON A.restaurantId = B.restaurantId \
          WHERE B.restaurantId = " +restaurantId);          
    con.query(sql, function (err, result) {
      if (err) { 
        console.log(err);         
        res.status(401).send(err);      
      } else
      {    
        console.log(result);                          
        res.status(200).send(result);
      }
});
}



module.exports = {
  fetchHomeBiz,
  fetchUser,
  fetchBiz   
}