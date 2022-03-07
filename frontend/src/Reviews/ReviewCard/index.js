import Rating from "../../shared/Rating/"
import "./ReviewCard.scss";
import { useEffect, useState } from "react";
import { ReactComponent as Medal } from "../../assets/medal.svg";
    
function ReviewCard(props) {
    function postFlagged() {
	if (!props.hasOwnProperty("flagged")) {
	    fetch("http://localhost:4000/flag-review", {
		method: "POST",
		headers: {
		    "Content-Type" : "application/json",
		},
		body: JSON.stringify({_id : props._id, flagged: 0}),
		credentials: "include",
	    });
	}
	else {
	    fetch("http://localhost:4000/flag-review", {
		method: "POST",
		headers: {
		    "Content-Type" : "application/json",
		},
		body: JSON.stringify({_id : props._id, flagged: props.flagged}),
		credentials: "include",
	    });
	}
    }
    
    const [reputation, setReputation] = useState(undefined);
    async function getReputation() {
	let request = await fetch("http://localhost:4000/get-reputation", {
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
	setReputation(response.high_reputation);
    }
    useEffect(()=>{
        getReputation();
    });

    return (
        <div className="review-card-container">
            <div>
                <Rating value={props.rating}/>
                <div className="review-card-descript">
                    <div className="title-text-container">
                        <div>
                            <p>“</p>
                        </div>
                        <div>
                            <h2>{ props.titleText }</h2>
                        </div>
                    </div>
                    <p>{ props.secondText}</p>
                </div>
            </div>
            <div className="review-card-info">
                <div className="first">
                    <p>written by</p>
                    <div className="secondT">
                        <div className="authorInfo">
                            <p>{props.authorText}</p> 
                        </div>
                        {
                            (props.topC) ?
                            <div className="topC">
                                <Medal />
                                <p>top contributor</p>
                            </div> : <></>
                        }
                    </div>
                </div>
                <div className="last">
                    <a href={props.link}>See his code.</a>
                </div>
		{reputation ?   
		 <div className="lastRed">
		    <a href="javascript:window.location.href=window.location.href" onClick={postFlagged()}>
			Flag comment
		    </a>
		</div>
		 :<div></div>}
            </div>
        </div>
    );
}

export default ReviewCard;
