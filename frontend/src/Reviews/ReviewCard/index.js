import Rating from "../../shared/Rating/"
import "./ReviewCard.scss";
import { useEffect, useState } from "react";
import { Popup } from "reactjs-popup";
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
            console.log("Why post: " + props._id);
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
    const [languageData, setLanguageData] = useState(undefined);

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
    async function getLanguageData() {
        if (props.link !== undefined && props.link.includes("github.com")) {
            let request = await fetch(`http://localhost:4000/language-data?link=${props.link}`, {
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
            setLanguageData(response);
        }
    }
    
    useEffect(()=>{
        getReputation();
        getLanguageData();
    }, []);

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
                {props.link !== "" && props.link !== undefined ?
                    <div className="last">
                        <Popup
                            trigger={open => (<a>See the code.</a>)} // href={props.link}
                            on={["hover"]}
                            position="top center"
                            closeOnDocumentClick
                        >
                            <div className="repo-insights">
                                { languageData && languageData.success ?
                                    (<>
                                        <h2>{ languageData.repoId }</h2>
                                        <h3>Language insights</h3>
                                        <div className="language-graph">
                                            { 
                                                languageData.langs.map(function(v, index) {
                                                    return (
                                                        <div className="language-graph-row" key={index}>
                                                            <h4>{v[0]}</h4>
                                                            <div>
                                                                <div style={{
                                                                    width: `${v[1] / languageData.sum * 100}%`,
                                                                }}></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </>) :
                                    <>
                                        That repository was not found. Either it doesn't exist on GitHub or the owner made it private.
                                    </>
                                }
                            </div>
                        </Popup>
                    </div> :
                    <></>
                }
                {reputation ?   
                    <div className="lastRed">
                        <a href="javascript:window.location.href=window.location.href" onClick={postFlagged}>
                            Flag comment.
                        </a>
		            </div>
		        : <></>}
            </div>
        </div>
    );
}

export default ReviewCard;
