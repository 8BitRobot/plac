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

let { clientID, clientSecret } = require("./githubsso.json");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.post("/login", function(req, res){
  if (req.cookies) {
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
