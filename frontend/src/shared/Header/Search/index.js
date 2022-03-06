import { useEffect, useState } from "react";
import "./Search.scss";
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";

function Search() {
    const [ allCompletions, setAllCompletions ] = useState([]);
    const [ currentCompletions, setCurrentCompletions ] = useState([])
    const [ value, setValue ] = useState("");

    async function fetchAutocomplete() {
        let request = await fetch("http://localhost:4000/get-libraries", {
            method: "GET",
            params: {
                "characters": ""
            },
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).catch((error) => {
            console.error(error);
        });
        let response = await request.json();
        console.log(response);
        setAllCompletions(response.matches);
    }

    useEffect(() => {
        fetchAutocomplete();
    }, []);

    useEffect(() => {
        console.log(value);
        setCurrentCompletions(allCompletions.filter((x) => x.includes(value)));
    }, [value]);

    return (
        <div className="searchBar">
            <SearchIcon />
            <input type="text" id="input" placeholder="Search" onChange={ (el) => setValue(el.target.value) }></input>
        </div>
    );
}

export default Search;