import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import "./Rating.scss";

const Rate = () => {
  const [rate, setRate] = useState(0);

  return (
    <div className="rating-container">
      {[...Array(5)].map((item, ind) => {
        var userRating = ind + 1;
        return (
          <div key={ind}>
            <div
              className={
                "rating-circle" +
                (rate >= userRating ? " filled" : "")
              }
              onClick={() => setRate(userRating)}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
  
export default Rate;