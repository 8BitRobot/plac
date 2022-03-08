import { useEffect, useState } from "react";
import Rating from  "../shared/Rating";
import "./Submit.scss";

function Submit() {
    const [langname, setLangname] = useState();
    const [rating, setRating] = useState(0);
    const [summary, setSummary] = useState("");
    const [description, setDesc] = useState("");
    const [projectLink, setLink] = useState("");

    useEffect(() => {
        const params = new URL(window.location.href).searchParams;
        const langname = (params.has("name") ? params.get("name") : "");
        setLangname(langname);
    }, []);

    async function submitReview() {
        let request = await fetch("http://localhost:4000/add-review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                rating: rating,
                summary: summary,
                description: description,
                link: projectLink,
                name: langname,
            }),
        }).catch((error) => {
            console.error(error);
        });

        let response = await request.json();
        console.log("Success!");
        console.log(response);
        window.location.reload();
    }
    return (
        <div id="submit-page" className="App">
            {langname !== "" && langname !== undefined ?
                <>
                    <h1 id="write-review-header">{ langname }<span>Write a Review</span></h1>
                    <div>
                        <div id="rating" className="form-input-container">
                            <label>Rating:</label>
                            <div>
                                <Rating value={ rating } setRating={ setRating }/>
                            </div>
                        </div>
                        <div id="summary" className="form-input-container">
                            <label htmlFor="summary-input">Summary:</label>
                            <input type="text"
                                name="summary"
                                id="summary-input"
                                placeholder="Write a summary..."
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </div>
                        <div id="description" className="form-input-container">
                            <label htmlFor="description-input">Description:</label>
                            <textarea rows="7"
                                    id="description-input"
                                    name="description"
                                    onChange={(e) => setDesc(e.target.value)}
                            ></textarea>
                        </div>
                        <div id="project-link" className="form-input-container">
                            <label htmlFor="project-link-input">Your Project:</label>
                            <input type="text"
                                name="project-link" 
                                id="project-link-input"
                                placeholder="Add your project link..."
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>
                        <button id="submit-button" type="submit" onClick={submitReview}>Submit</button>
                    </div>
                </> :
                <h1 id="submission-error">Select a language to review with the search bar above.</h1>
            }

    </div>
  );
}

export default Submit;
