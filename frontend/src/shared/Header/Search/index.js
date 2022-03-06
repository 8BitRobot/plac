import { useEffect, useState } from "react";
import "./Search.scss";
import React from 'react';
import Select from 'react-select';
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";

<<<<<<< HEAD
=======
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
>>>>>>> cb363fbdb21ef3ae20fbd947b520c32d7d08f3c5

const optins = [
    { label: 'HEY', value: 'YO'},
    {label: "GREAT", value: "LM"},
];

const customStyles = {
    control: (base,state) => ({
      ...base,
      height: 40,
      width: 304,
      borderRadius: 20,
      fontFamily: 'Manrope',
      fontSize: 18,
      border:'none',
      fontStyle: 'bold',
      boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.25)',
      cursor: 'text',
    }),
  
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        width: 304,
        height: 40,
        cursor: 'pointer',
        backgroundColor: isFocused ? '#DDDDDD' : 'white',
        
      }
    },
    indicatorContainer: styles =>({
        display: 'none',
    }),
    input: styles => ({
      ...styles,
      color: 'black',
      fontFamily: 'Times New Roman, Times, Serif',
    }),
  
    menu: styles => ({
      ...styles,
      position: 'absolute',
      boxShadow: 'none',
    }),
  
    singleValue: styles => ({
      ...styles,
      
    }),
  }

function Search() {
    
    return (
        <div className="searchBar">
<<<<<<< HEAD
            <Select
                options={optins}

                styles={customStyles}
                placeholder="Search"
                openMenuOnClick={false}

            />
=======
            <SearchIcon />
            <input type="text" id="input" placeholder="Search" onChange={ (el) => setValue(el.target.value) }></input>
>>>>>>> cb363fbdb21ef3ae20fbd947b520c32d7d08f3c5
        </div>
    );
}

export default Search;