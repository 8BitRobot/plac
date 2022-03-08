express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const axios = require("axios");
const ObjectID = require('mongodb').ObjectID;

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

function getUsername(token, process) {
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

function addToDb(item, col) {
  var tempdb = db.collection(col);
  tempdb.insertOne(item, function (err, res) {
    if (err) console.log(err);
  });
}

function getFromDb(item, col, process) {
    db.collection(col).find(item).toArray().then(process);
}

app.post("/add-review", function (req, res) {
  if (!req.body.hasOwnProperty("rating") || !req.body.hasOwnProperty("summary") || !req.body.hasOwnProperty("description") || !req.body.hasOwnProperty("link") ||  (!req.cookies.token || req.cookies.token === "undefined")) {
	  res.send({status: 400});
  }
  else {
  	function process(username) {
	    data = req.body;
	    data["username"] = username;
      if (!data.link.includes("https://")) data.link = "https://" + data.link;
	    addToDb(data, "reviews");
	    res.send({status : 200});
	  }
	  getUsername(req.cookies.token, process);
  }
});

app.get("/get-review", function (req, res) {
  async function process(reviews) {
    let notFlagged = [];
    for (var review of reviews) {
      if (!review.hasOwnProperty("flagged") || review.flagged < 2) {
        let repos = [];
        try {
          let response = await axios({
            method: "GET",
            url: `https://api.github.com/users/${review.username}/repos`,
            headers: {
              Authorization: "token " + token,
            },
          });
          repos = response.data;
        }
        catch (err) {}
        let cnt = 0;
        
        for (var repo of repos) {
          cnt += repo.stargazers_count + repo.watchers_count;
          if (cnt >= 10) break; // remove this if making the threshold higher
        }
        console.log(cnt);
        review["top_contributor"] = (cnt >= 10);
        console.log(review["top_contributor"]);
        notFlagged.push(review);
      }
    }
    res.send(notFlagged);
  }
  getFromDb({name : req.query.name}, "reviews", process);
});

app.post("/login", function (req, res) {
  if (req.cookies.token && req.cookies.token != "undefined") {
    console.log(req.cookies.token);
    console.log("Token already exists!");
      res.send({
	  logged: false,
      });
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
      if (response.data.access_token === "undefined" || response.data.access_token === undefined) {
	  res.send({
	      logged: false,
	      status: 200,
	  });
      }
      else {
	  res.send({
	      logged: true,
	      status: 200,
	  });
      }
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

app.get("/get-reputation", function(req, res) {
  if (!Object.prototype.hasOwnProperty.call(req.cookies, "token") || req.cookies.token === "undefined" || req.cookies.token === undefined) {
    res.send(JSON.stringify({high_reputation: false}));
  } else {
    async function process(username) {
      let requestBody = {
        method: "GET",
        url: `https://api.github.com/users/${username}/repos`,
        headers: {
          Authorization: `token ${req.cookies.token}`
        },
      };
      let response = await axios(requestBody);
      repos = response.data;
      let cnt = 0;
      for (var repo of repos) {
        cnt += repo.stargazers_count + repo.watchers_count;
      }
      if (cnt >= 10) {
        res.send(JSON.stringify({high_reputation: true}));
      }
      else {
        res.send(JSON.stringify({high_reputation: false}));
      }
    }
    getUsername(req.cookies.token, process)
  }
  // async function process(username) {
  //   let response = await axios({
  //       method: "GET",
  //       url: `https://api.github.com/users/${username}/repos`,
  //   });
        
  //   console.log(response);
  //   repos = response.data;
  //   data = {}
  //   for (const repo of repos) {
  //     console.log(repo);
  //     let languages = await axios({
  //       method: "GET",
  //       url: `${repo.url}/languages`
  //     });
  //     languages = languages.data;
  //     for (const language in languages) {
  //       if (!data.hasOwnProperty(language)) {
  //         data[language] = 0;
  //       }
  //       data[language] += languages[language];
  //     }
  //   }
  //   res.send(data)
  // }
  // getUsername(req.cookies.token, process)
});

app.get("/language-data", function (req, res) {
  let [owner, repo] = req.query.link.split("/").slice(-2);
  function process(data) {
    console.log(data);
    let langs = Object.entries(data);
    let sum = 0;
    if (langs.length === 0) {
      res.send({success: false});
    } else if (langs.length === 1) {
      sum = langs[0][1];
    } else {
      for (let lang of langs.slice(1)) {
        sum += lang[1];
      }
    }
    res.send({
      success: true,
      sum: sum,
      repoId: `${owner}/${repo}`,
      langs: langs,
    });
  }
  function getLanguageData(owner, repo, process) {
    let requestBody = {
      method: "GET",
      url: `https://api.github.com/repos/${owner}/${repo}/languages`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
    if (Object.prototype.hasOwnProperty.call(req.cookies, "token") && req.cookies["token"] !== "undefined") {
      requestBody.headers.Authorization = `token ${req.cookies.token}`
    };
    axios(requestBody).then((response) => {
      if (response.status === 200) {
        process(response.data);
      } else {
        res.send({
          success: false,
        });
      }
    }).catch((err) => {
      console.error("failed");
      res.send({
        success: false,
      })
    });
  }
  getLanguageData(owner, repo, process);
});

//get username from github api token
app.get("/get-username", function (req, res) {
  if (!Object.prototype.hasOwnProperty.call(req.cookies, "token") || req.cookies["token"] === "undefined") {
	  res.send(JSON.stringify({username: "Guest"}));		
  }
  else {
    function process(username) {
      res.send(JSON.stringify({username: username}));
    }
    getUsername(req.cookies.token, process);
  }
});

app.get("/get-libraries", function(req, res) {
  function process(libraries) {
	  res.send(JSON.stringify(libraries));
  }
  getFromDb({}, "libraries", process);
});

app.post("/flag-review", function(req, res) {
  db.collection("reviews").updateOne({"_id" : ObjectID(req.body._id)}, { $set: { flagged : req.body.flagged+1  }});
  res.send({status: 200});
});

app.get("/get-description", function(req, res) {
  function process(libraries) {
    if (libraries.length === 0) {
      res.send({status: 400});
    }
    else {
      if (libraries[0].hasOwnProperty("description")) {
        res.send(JSON.stringify({desc : libraries[0].description}));
      }
      else {
        res.send(JSON.stringify({desc : ""}));
      }
    }
  }
  getFromDb({name: req.query.name}, "libraries", process);
});
