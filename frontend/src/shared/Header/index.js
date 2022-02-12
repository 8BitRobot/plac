import "./Header.scss";
// import { useEffect } from "react";

function Header() {
    return (
        <header>
            <h1>p<span>la</span>c.</h1>
            <div id="header-links">
                <a>reviews</a>
                <a id="header-submit">submit</a>
            </div>
        </header>
    );
}

export default Header;