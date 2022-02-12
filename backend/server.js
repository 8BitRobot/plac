const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const axios = require("axios");

const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

let { clientID, clientSecret } = require("./githubsso.json");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

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
