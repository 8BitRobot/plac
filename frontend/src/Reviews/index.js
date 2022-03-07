import { useEffect, useState } from "react";


import "./Reviews.scss";

import ReviewCard from "./ReviewCard";

function Reviews() {
    let [reviews, setReviews] = useState(undefined);
    async function getReviews() {

	const params = new URL(window.location.href).searchParams;

	console.log(params.get("name"));
	
	let request = await fetch("http://localhost:4000/get-review?name="+(params.has("name") ? params.get("name") : ""), {
	//let request = await fetch("http://localhost:4000/get-review", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }).catch((error) => {
          console.error(error);
        });
	
        let response = await request.json();
	console.log(response);
	setReviews(response);
    }
    useEffect(()=>{
        if (reviews === undefined) {
            getReviews();
        }
    });
    
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
	  {reviews ? reviews.map(function(d, idx){
              return (<ReviewCard
		      rating={d.rating}
		      titleText={d.summary}
		      secondText = {d.description}
		      authorText = {d.username}
		      topC = {true}
		      link = {d.link}/>)
	  }) : null}
      </div>
    </div>
  );
}

export default Reviews;



