import { useEffect } from "react";


import "./Review.scss";

import ReviewCardCard from "./ReviewCard";



function reviewPage() {
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

export default Reviews;



