import { useEffect } from "react";


import "./Reviews.scss";

import ReviewCard from "./ReviewCard";

function Reviews() {
  return (
    <div className="Reviews">
      <div id="review-subject">
        <h1>
          RegExp
        </h1>
        <h2>
          A JavaScript object used for matching text with a pattern.
        </h2>
      </div>
      <div id="review-cards">
        <ReviewCard
          rating={1}
          titleText={ "RegExp is a menace!" }
          secondText={"When will the people of Los Angeles be free from the malevolent miscreant we call RegExp? It’s a menace, I say! A menace!"}
          authorText={"E. Edward Eggertson"}
          topC={true}
          link={"https://github.com/8BitRobot/plac"}

        />
        <ReviewCard
          rating={5}
          titleText={ "It's not delivery, it's DiGiornos." }
          secondText={"Please replace the DiGiornos part with RegExp, and make sure to delete this part before posting. The money has been transferred to your account. What about a longer string? This review is exceedingly long and therefore very annoying to handle."}
          authorText={"Javon Scripps"}
          topC={true}
          link={"https://github.com/8BitRobot/plac"}
        />
        <ReviewCard
          rating={3}
          titleText={ "Nice library, bro. Unfortunately,"}
          secondText={"Don’t care + didn’t ask + L + ratio."}
          authorText={"David A. Smallberg"}
          link={"https://github.com/8BitRobot/plac"}
        />
      </div>
    </div>
  );
}

export default Reviews;



