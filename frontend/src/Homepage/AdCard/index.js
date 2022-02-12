import "./AdCard.scss";

function AdCard(props) {
    return (
        <div className="ad-card-container">
            <div>
                <h2>{ props.titleText }</h2>
                <p>{ props.bodyText }</p>
            </div>
            <a>{ props.linkText }</a>
        </div>
    );
}

export default AdCard;