import Rating from "../../shared/Rating/"
import "./ReviewCard.scss";
import { ReactComponent as Medal } from "../../assets/medal.svg";

function ReviewCard(props) {
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
            </div>
        </div>
    );
}

export default ReviewCard;