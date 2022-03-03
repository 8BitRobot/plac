import { useEffect } from "react";


import "./Reviews.scss";

import ReviewCard from "./ReviewCard";



function Reviews() {
  return (
    <div className="Reviews">
      <div id="review-subject">
        <h1> <span>RegExp</span>        A JavaScript object used for matching text with a pattern.</h1>
      </div>
      <div id="review-cards">
        <ReviewCard
          titleText={ <><span>" </span>RegExp is a menace!</> }
          secondText={"When will the people of Los Angeles be free from the malevolent miscreant we call RegExp? It’s a menace, I say! A menace!"}
          authorText={"E. Edward Eggertson"}
           topC={"top contributor"}
           link={"See his code."}

        />
        <ReviewCard
          titleText={ <><span>" </span>It’s not delivery, it’s DiGiornos.</> }
          secondText={"Please replace the DiGiornos part with RegExp, and make sure to delete this part before posting. The money has been transferred to your account."}
          authorText={"Javon Scripps"}
           topC={"top contributor"}
           link={"See his code."}
        />
        <ReviewCard
          titleText={ <><span>" </span>Nice library, bro. Unfortunately,</> }
          secondText={"Don’t care + didn’t ask + L + ratio.”"}
          authorText={"David A. Smallberg"}
           link={"See his code."}
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



