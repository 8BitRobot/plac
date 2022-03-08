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
            {reviews === undefined ? 
              <h2>Loading reviews...</h2>
              : (reviews.length === 0 ? 
              <h2>No reviews found. Be the first to submit one!</h2>
              : reviews.map(function(d, idx){
                  return (<ReviewCard
                    key={idx}
                    rating={d.rating}
                    titleText={d.summary}
                    secondText = {d.description}
                    authorText = {d.username}
                    topC = {d.top_contributor}
                    link = {d.link}
                    flagged = {!d.flagged ? 0 : d.flagged}
                    _id = {d._id}
                  />)
              }))
            }
          </div>
        </> :
        <h1 id="submission-error">Select a language to read reviews for with the search bar above.</h1>
      }
    </div>
  );
}

export default Reviews;



