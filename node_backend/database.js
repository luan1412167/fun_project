var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';


let dbInstance;
var options = { useNewUrlParser: true, useUnifiedTopology: true};
const connectDb = function(dbName,cb){
  if(dbInstance){
    return cb(dbInstance);
    }else{
        MongoClient.connect(url + dbName, options, function(err,client){
          if(!err){
                 dbInstance = client;
                 return cb(client);
                }
              })
            }
          }

var methods = {};

methods.register = function(dbName, collectionName, values, cb){
  connectDb(dbName, function(db){
    var dbo = db.db(dbName);
    var values_insert = {
      'firstname' : values.first_name,
      'lastname' : values.last_name,
      'email' : values.email,
      'password' : values.password
    }
    dbo.collection(collectionName).insertOne(values_insert);
    console.log('Insert successfull');
    cb(true);
  })
}

methods.authentication = function(dbName, collectionName, values, cb){
  connectDb(dbName, function(db){
    var dbo = db.db(dbName);
    var query = {
      'email':values.email
    }

    dbo.collection(collectionName).findOne(query).then((document) => {
        if (document.password == values.password){
          cb(true);
        }else{
          cb(false);
        }
    }).catch((err) => {
      if (err) throw err;
    });
    }

    // let document = dbo.collection(collectionName).findOne(query);
    // console.log(document);
    // if (document.password == values.password){
    //     cb(true);
    // }else{
    //     cb(false);
    // }
)}

module.exports = methods;