
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
                    <p>{ props.firstT }</p>
                    <p> {props.secondT} </p>
                    <a> {props.last} </a>

                </div>
            </div>
        </div>
    );
}

export default ReviewCard;