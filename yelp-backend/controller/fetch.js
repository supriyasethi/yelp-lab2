var con = require('../connection');
//var con = require('../pool');
const mysql = require('mysql');

// var pool      =    mysql.createPool({
//   connectionLimit : 10,
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'yelplab1',
//   debug    :  false
// });    

function fetchhome(req,res) {
    console.log("Inside Home Get request"); 
    let location = req.query.location;
    let dish = req.query.keyword;
    var sql = 
      mysql.format("SELECT * FROM restaurant A INNER JOIN menu B \
            ON A.restaurantId = B.restaurantId \
            WHERE A.city = '" +location + "' \
            AND B.dishName LIKE '%" + dish + "%'");            
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

function fetcheventkey(req,res) {
  console.log("Inside Event Search Get request");   
  let key = req.query.key;
  var sql = 
    mysql.format("SELECT * FROM events WHERE \
          name LIKE '%" + key + "%'");            
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

function fetchevent(req, res) {
console.log("Inside Event Get request"); 
console.log(req.session);
var sql = 
    mysql.format("SELECT * FROM events"); 
  // mysql.format("SELECT * FROM restaurant A INNER JOIN events B \
  //       ON A.restaurantId = B.restaurantId \
  //       WHERE B.restaurantId = " +req.session.restaurantId);          
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

function fetchevents(req, res) {
  console.log("Inside Event Get request"); 
  console.log(req.query);
  let restaurantId = req.query.restaurantId;
  var sql = 
      mysql.format("SELECT * FROM events A \
      INNER JOIN eventsregister B \
      on A.restaurantId = B.restaurantId \
	    INNER JOIN user C \
		  on B.userId = C.userId \
         WHERE A.restaurantId = " + restaurantId);             
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

// function fetchevent(req, res) {
//   console.log("Inside Event Get request"); 
//   var sql = 
//       mysql.format("SELECT * FROM events"); 
  
//   // pool.getConnection(function(err,connection){
//   //       if (err) {
//   //         console.log(err);
//   //         connection.release();
//   //         throw err;
//   //       }   
//         pool.query(sql,function(err,rows){
//             if(!err) {
//                 console.log('inside not error');
//                 res.status(200).send(rows);
//             }           
//             //connection.release();

//         });
//         // connection.on('error', function(err) {      
//         //       throw err;
//         //       connection.release();
//         //       return;     
//         // });
//     //});
// }
 

function fetchuserp(req, res) {
    console.log("Inside User Profile"); 
    console.log(req.query);
    let userid = req.query.userId;
  console.log('session.userid', req.session.userId);
  var sql = 
    mysql.format("SELECT * FROM user WHERE userId ="+ req.query.userId );
    con.query(sql, function (err, result) {
      if (err) { 
        console.log(err);         
        res.status(401).send(err);      
      } else
      {   
        res.send(result);
        console.log(result);
        //res.status(200).send(result);
      }
});
}

function fetchbizp(req, res) {
    console.log("Inside Biz Profile");  
    console.log(req.session.restaurantId);
    let restaurantId = req.query.restaurantId;   
  var sql = 
    mysql.format("SELECT * FROM restaurant WHERE restaurantId ="+ restaurantId);
    console.log(sql);
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

function fetchorders(req, res) {
  console.log("Inside fetch orders Profile");  
  console.log(req.body);
  let restaurantId = req.query.restaurantId;   
var sql = 
  mysql.format("SELECT * FROM orders A INNER JOIN user B \
        ON A.userId = B.userId \
        WHERE A.restaurantId ="+ req.query.restaurantId);
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

function fetchorder(req, res) {
  console.log("Inside fetch view order Profile");  
  console.log(req.body);
  let restaurantId = req.query.restaurantId;   
var sql = 
  mysql.format("SELECT * FROM orders A INNER JOIN restaurant B \
        ON A.restaurantId = B.restaurantId \
        WHERE A.userId ="+ req.query.userId);
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

function fetchbizlist(req, res) {
  console.log("Inside fetch orders Profile");  
  console.log(req.body);
  let restaurantId = req.query.userId;   
var sql = 
  mysql.format("SELECT * FROM restaurant A INNER JOIN orders B \
        ON A.restaurantId = B.restaurantId \
        WHERE B.userId ="+ req.query.userId);
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

function fetchreviews(req, res) {
  console.log("Inside fetch reviews Profile");  
  console.log(req.body);
  //let restaurantId = req.query.userId;   
var sql = 
  mysql.format("SELECT A.reviews, A.rating, B.first_name, B.last_name, B.userId FROM reviews A \
      INNER JOIN user B  on A.userId = B.userId \  WHERE A.restaurantId ="+ req.query.restaurantId);
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
    fetchhome,
    fetchmenu,
    fetchuserp,
    fetchbizp,
    fetchevent,
    fetchevents,
    fetchorders,
    fetchbizlist,
    fetchreviews,
    fetcheventkey,
    fetchorder
}