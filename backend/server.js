const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

var db = require('./mongo.js').collection('test2');

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

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

