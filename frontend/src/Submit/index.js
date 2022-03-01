// import { useEffect } from "react";
import "./Submit.scss";

function Submit() {
    return (
        <div id="submit-page" className="App">
            <h1 id="write-review-header">Write A Review</h1>
            <form>
                <div id="summary" className="form-input-container">
                    <label htmlFor="summary-input">Summary:</label>
                    <input type="text" name="summary" id="summary-input"/>
                </div>
                <div id="description" className="form-input-container">
                    <label htmlFor="description-input">Description:</label>
                    <textarea rows="7" id="description-input" name="description"></textarea>
                </div>
                <div id="project-link" className="form-input-container">
                    <label htmlFor="project-link-input">Your Project:</label>
                    <input type="text" id="project-link-input" name="project-link"/>
                </div>
                {/* TODO: make a button with type="submit" and the text `Submit`
                (without the backticks) */}
            </form>
        </div>
    )
}

export default Submit;