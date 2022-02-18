const express = require("express");
const app = express();
const cors = require("cors");
<<<<<<< HEAD
require("dotenv").config({ path: "./config.env" });
const axios = require("axios");

=======
>>>>>>> database
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
let { clientID, clientSecret } = require("./githubsso.json");
=======
var db = require('./mongo.js').collection('test2');
>>>>>>> database

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

<<<<<<< HEAD
app.post("/login", function(req, res){
  let code = req.body.authcode;
  axios({
    method: "POST",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      Accept: "application/json",
    }
  }).then((response) => {})

  res.send({title : "hi"});
});
=======
app.get('/testAdd', function(req, res){
    db.insertOne({name: "Rishab", last: "Khurana"}, function(err, res) {
	if (err) console.log(err);
	else console.log("inserted");
    });
    res.send("you tried");
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

>>>>>>> database
