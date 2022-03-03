
import "./ReviewCard.scss";

function ReviewCard(props) {
    return (
        <div className="review-card-container">
            <div>
                <div className="review-card-descript">
                <h2>{ props.h2 }</h2>
                <p>{ props.p}</p>
                </div>
            </div>
            <div>
                <div className = "review-card-info">
                    <p>written by</p>
                    <div className = "secondT">
                        <div className = "authorInfo">
                           <p>{props.authorText}</p> 
                        </div>
                        <div className = "topC">
                            <p>{props.topC}</p>
                        </div>
                    
                    </div>

                    <div className = "last">
                        <a>{props.link}</a>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default ReviewCard;