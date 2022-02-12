import { useEffect } from "react";

import GithubMark from "../assets/github_logo.png";

import "./Homepage.scss";

import AdCard from "./AdCard";

let client_id = "66e07c977ca0164c8fa6";
let scopes = "read:user read:org repo"

function Homepage() {
  async function login(code) {
    let response = await (await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authcode: code,
      }),
    }).catch((error) => {
      console.error(error);
    })).json()
    console.log("Success!");
    console.log(response);
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
        <a id="github-sign-in" href={ `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${client_id}` }>
          <span>Sign in with GitHub</span>
          <img src={ GithubMark } alt="Github Logo" />
        </a>
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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href={ `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${client_id}` }>
          Login
        </a>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default Homepage;
