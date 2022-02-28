import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { Container, Star, Rating } from "./rating.scss";
const Rate = () => {
  const [rate, setRate] = useState(0);
  return (
    <Container>
      {[...Array(5)].map((item, ind) => {
        var userRating = ind + 1;
        return (
          <label>
            <Star
              type="star"
              value={userRating}
              onClick={() => {
                setRate(userRating);
              }}
            />
            <Rating>
              <FaRegCircle
                color={
                  userRating < rate || userRating === rate
                    ? "000"
                    : "057ACE"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};
  
export default Rate;