var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json());
var database = require('./database');

app.post('/api/login', (req, res) => {
  var values = {
    'email':req.body.email,
    'password':req.body.password
  }
  
  database.authentication('fun_project', 'fun_project', values, (authen)=>{
    if (authen == true){
      console.log(authen);
      res.status(200).send('login successfull')
    }else{res.status(400).send('login fail')
    }
  });
  // console.log(database.authentication('fun_project', 'fun_project', values));
})

app.post('/api/register', (req, res) => {
  console.log(req.body);
  var values = {
    'firstname' : req.body.firstname,
    'lastname' : req.body.lastname,
    'email' : req.body.email,
    'password' : req.body.password
  }
  database.register('fun_project', 'fun_project', values, (register)=>{
    if (register==true){
      res.status(200).send('register successfull')
    }else{
      res.status(400).send('register fail')
    }
  });
})

var server = app.listen(4000, function(){});