import "./Header.scss";
import Search from "./Search/";
import { useEffect, useState } from "react";
import gray_square from "../../assets/gray_square.png"
function Header() {
    let [username, setUsername] = useState(undefined);

    const params = new URL(window.location.href).searchParams;
    const name = (params.has("name") ? params.get("name") : "");


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
            <a href="/"> <h1>p<span>la</span>c.</h1></a>
            <div id="header-links">
                <Search />
                <a href={"review?name=" + name}>reviews</a>
                <a id="header-submit" href={"submit?name=" + name}>submit</a>
                { (username === undefined) ?
                    <img id="profile-picture" src={ gray_square }/>
                    :
                    <img id="profile-picture" src={ "https://www.github.com/" + username + ".png" }/>
                }
            </div>
        </header>
    );
}

export default Header;
