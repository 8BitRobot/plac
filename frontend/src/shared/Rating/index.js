import React from "react";
import "./Rating.scss";

const Rate = (props) => {
  return (
    <div className="rating-container">
      {[...Array(5)].map((_, ind) => {
        var userRating = ind + 1;
        return (
          <div key={ind}>
            <div
              className={
                "rating-circle" +
                (props.value >= userRating ? " filled" : "")
              }
              onClick={() => props.setRating(userRating)}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
  
export default Rate;