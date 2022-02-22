const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const axios = require("axios");

const port = process.env.PORT || 4000;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

var db = require('./mongo.js');

let { clientID, clientSecret } = require("./githubsso.json");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/testAdd', function(req, res){
    db.collection("test2").insertOne({name: "Rishab", last: "Khurana"}, function(err, res) {
    if (err) console.log(err);
    else console.log("inserted");
  });
  res.send("you tried");
});

function addToDb(item, col) {
    var tempdb = db.collection(col);
    tempdb.insertOne(item, function(err, res){
	if (err) console.log(err);
    });
}

function getFromDb(item, col, pres) {
    db.collection(col).find(item).toArray(function(err, res) {
	pres.send(res);
    });
}

app.post('/addComment', function(req, res) {
    addToDb(req.body, "comment");
    res.send(req.body);
});

app.get('/getComment', function(req, res) {
    getFromDb(req.body, "comment", res);
});

app.get('/testGet', function(req, res) {
  console.log(req);
  db.findOne({name: req.query.name}, function(err, dbres) {
    res.send(dbres);
  });
});

app.post('/searchDB', function(req, res) {
  console.log(req.body);
  db.find({}).toArray(function(err, dbres) {
    res.send(dbres);
  });
});

app.post('/login', function(req, res){
  if (req.cookies.token) {
    console.log(req.cookies.token);
    console.log("Token already exists!");
    return;
  } else {
    console.log(req.cookies);
  }
  let code = req.body.authcode;
  axios({
    method: "POST",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.cookie("token", response.data.access_token, { maxAge: 3600000 });
    console.log("set cookie: " + response.data.access_token);
    res.send({
      status: 200,
    });
  })
});
