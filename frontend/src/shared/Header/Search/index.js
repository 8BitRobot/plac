import { useEffect } from "react";
import "./Search.scss";
import React from 'react';
import Select from 'react-select';
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";


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
            <Select
                options={optins}

                styles={customStyles}
                placeholder="Search"
                openMenuOnClick={false}

            />
        </div>
    );
}

export default Search;