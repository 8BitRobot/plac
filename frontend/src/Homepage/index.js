import { useEffect, useState } from "react";

import GithubMark from "../assets/github_logo.png";
import Cookies from "js-cookie";
import "./Homepage.scss";

import AdCard from "./AdCard";

let client_id = "66e07c977ca0164c8fa6";
let scopes = "read:user read:org repo"

function Welcome() {
  let [username, setUsername] = useState(undefined);
  async function getUsername(code) {
	  let request = await fetch("http://localhost:4000/get-username", {
      method: "GET",
      headers: {
	    	"Content-Type": "application/json",
      },
      credentials: "include",
	  }).catch((error) => {
      console.error(error);
	  });
    let response = await request.json()
    console.log("Success!");
    console.log(response);
    console.log(response.username);
    setUsername(response.username);
  }
  useEffect(()=>{
    if (username === undefined) {
      getUsername();
    }
  });

  if (Cookies.get("token") === undefined || Cookies.get("token") === "undefined") {
	  return ( <a id="github-sign-in" href={ `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${client_id}` }>
      <span>Sign in with GitHub</span>
      <img src={ GithubMark } alt="Github Logo" /> </a>);
    }
  else {
	  return (<span id="welcome" > Welcome,<b> {username}</b>. </span>);
  }
}

function Homepage() {
  async function login(code) {
    let request = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        authcode: code,
      }),
    }).catch((error) => {
      console.error(error);
    });
    let response = await request.json()
    console.log("Success!");
    console.log(response.logged);
    if (response.logged) {
      window.location.reload(false);
    }
  }
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams((new URL(url)).search);
    let code = urlParams.get("code");
    if (url.includes("?code=")) {
      login(code);
    }
  });
    
  return (
    <div className="App">
      <div id="headlines">
        <h1>Find the <span>right tool</span> for the job.</h1>
        <Welcome />
      </div>
      <div id="ad-cards">
        <AdCard
          titleText={ <><span>Expertise</span>, never easier.</> }
          bodyText={"PLAC takes the “busy” out of business so you can find what you need, fast."}
          linkText={ "Find a review." } 
        />
        <AdCard
          titleText={ <>A jury of your <span>peers</span>.</> }
          bodyText={"PLAC's community is made up of brilliant developers just like yourself."}
          linkText={ "Write a review." } 
        />
        <AdCard
          titleText={ <><span>Validating</span> everything.</> }
          bodyText={"PLAC links reviewers to their GitHub profiles so you can see the code behind the words."}
          linkText={ "Link your GitHub." } 
        />
      </div>
    </div>
  );
}

export default Homepage;
