import { useEffect } from "react";
import "./Search.scss";
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";

function Search() {

    return (
        <div className="searchBar">
            <SearchIcon />
            <input type = "text" id = "input" placeholder = "Search"></input>
        </div>
    );
}

export default Search;