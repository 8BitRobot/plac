const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const axios = require("axios");

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

var db = require("./mongo.js");

let { clientID, clientSecret } = require("./githubsso.json");
const { MinKey } = require("mongodb");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/test-add", function (req, res) {
  db.collection("test2").insertOne(
    { name: "Rishab", last: "Khurana" },
    function (err, res) {
      if (err) console.log(err);
      else console.log("inserted");
    }
  );
  res.send("you tried");
});

function addToDb(item, col) {
  var tempdb = db.collection(col);
  tempdb.insertOne(item, function (err, res) {
    if (err) console.log(err);
  });
}

function getFromDb(item, col, pres) {
  db.collection(col)
    .find(item)
    .toArray(function (err, res) {
      pres.send(res);
    });
}

app.post("/add-comment", function (req, res) {
  addToDb(req.body, "comment");
  res.send(req.body);
});

app.get("/get-comment", function (req, res) {
  getFromDb(req.body, "comment", res);
});

app.post("/add-language", function (req, res) {
  addToDb(req.body, "language");
  res.send(req.body);
});

app.get("/get-language", function (req, res) {
  addToDb(req.body, "language");
});
app.get("/test-get", function (req, res) {
  // console.log(req);
  // db.collection("test2").find({ name: req.query.name }, function (err, dbres) {
  //   res.send(dbres);
  // });
  getFromDb({}, "test2", res);
});

app.post("/search-db", function (req, res) {
  console.log(req.body);
  db.find({}).toArray(function (err, dbres) {
    res.send(dbres);
  });
});

app.post("/login", function (req, res) {
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
  });
});

//return n most related
function top(search, listDescript, n) {
  //n is 2
  //listDescript is list of descriptions[["java","object","oriented","slow"],["c++","fast"],["rust","new"]]
  //search is Set( ["fast","object"])( should be set)
  let list = [];
  for (let i = 0; i < listDescript.length; i++) {
    let matches = 0;
    for (let element of listDescript[i]) {
      if (search.has(element)) {
        matches++;
      }
    }
    list.append([matches / listDescript[i].length, i]);
  }
  list.sort(function (a, b) {
    return a[0].compare(b[0]);
  });
  let ans = [];
  for (let i = 0; i < Math.min(n, list.length); i++) {
    ans.append(list[i][1]);
  }
  return ans;
}

app.get("/search-review", function (req, res) {
  const searchquery = new Set();
  for (let i = 0; i < req.length(); i++) {
    searchquery.add(req[i]);
  }
  let retlist = top(searchquery, search - db({}, "comments", null), 2);
  res.send(retlist);
});

function getUsername(token, process) {
    console.log("WAS HERE");
    axios({
	method: "GET",
	url: `https://api.github.com/user`,
	headers: {
	    Authorization: "token " + token,
	},
    }).then((response) => {
	process(response.data.login);
    });
}

app.get("/get-reputation", function(req, res) {
    async function process(username) {
	let response = await axios({
	    method: "GET",
	    url: `https://api.github.com/users/${username}/repos`,
	});
	    
	console.log(response);
	repos = response.data;
	data = {}
	for (const repo of repos) {
	    console.log(repo);
	    let languages = await axios({
		method: "GET",
		url: `${repo.url}/languages`
	    });
	    languages = languages.data;
	    for (const language in languages) {
		if (!data.hasOwnProperty(language)) {
		    data[language] = 0;
		}
		data[language] += languages[language];
	    }
	}
	res.send(data)
    }
    getUsername(req.cookies.token, process)
});

//get username from github api token
app.get("/get-username", function (req, res) {
    if (!req.cookies.hasOwnProperty("token") || (req.cookies["token"] === "undefined")) {
	res.send(JSON.stringify({username: "Guest"}));
    }
    else {
	function process(username) {
	    res.send(JSON.stringify({username: username}));
	}
	getUsername(req.cookies.token, process);
    }
});

