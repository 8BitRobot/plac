import { useEffect, useState } from "react";


import "./Reviews.scss";

import ReviewCard from "./ReviewCard";

function Reviews() {
  let [reviews, setReviews] = useState(undefined);
  let [name, setName] = useState(undefined);
  let [description, setDescription] = useState(undefined);
  async function getReviews() {
    const params = new URL(window.location.href).searchParams;
    console.log(params.get("name"));
    setName(params.get("name"));
    let request = await fetch("http://localhost:4000/get-description?name="+(params.has("name") ? params.get("name") : ""), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).catch((error) => {
      console.error(error);
    });
	  let response = await request.json();
	  setDescription(response.desc);
	  request = await fetch("http://localhost:4000/get-review?name="+(params.has("name") ? params.get("name") : ""), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).catch((error) => {
      console.error(error);
    });
    response = await request.json();
	  setReviews(response);
  }
  useEffect(()=>{
      if (reviews === undefined) {
          getReviews();
      }
  }, [reviews]);
    
  return (
    <div className="Reviews">
      { name !== undefined && name !== "" ?
        <>
          <div id="review-subject">
            <h1>
              {name}
            </h1>
            <h2>
              {description}
            </h2>
          </div>
          <div id="review-cards">
            {reviews ? reviews.map(function(d, idx){
              return (<ReviewCard
                rating={d.rating}
                titleText={d.summary}
                secondText = {d.description}
                authorText = {d.username}
                topC = {true}
                link = {d.link}
                flagged = {!d.flagged ? 0 : d.flagged}
                _id = {d._id}
              />)
            }) : null}
          </div>
        </> :
        <h1 id="submission-error">Select a language to read reviews for with the search bar above.</h1>
      }
    </div>
  );
}

export default Reviews;



