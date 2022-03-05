import "./Header.scss";
import { useEffect, useState } from "react";

function Header() {
    let [username, setUsername] = useState(undefined);
    async function getUsername(code) {
        let request = await fetch("http://localhost:4000/get-username", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }).catch((error) => {
          console.error(error);
        });
        let response = await request.json()
        console.log("Success!");
        console.log(response);
        console.log(response.username);
        setUsername(response.username);
    }
    useEffect(()=>{
        if (username === undefined) {
            getUsername();
        }
    });
    return (
        <header>
            <h1>p<span>la</span>c.</h1>
            <div id="header-links">
                <a href="review">reviews</a>
                <a id="header-submit" href="submit">submit</a>
                <img id="profile-picture" src={ "https://www.github.com/" + username + ".png" }/>
            </div>
        </header>
    );
}

export default Header;