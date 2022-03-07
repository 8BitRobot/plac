import { useEffect, useState } from "react";
import "./Search.scss";
import React from 'react';
import Select from 'react-select';
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";
import { setState } from 'react';

const optins = [
    { label: 'HEY', value: 'Test2'},
    {label: "GREAT", value: "Test1"},
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
    const [value, setValue] = useState(null);
    const onDropdownChange = (value) => {
	setValue(value);
    };
    const submitSelectCategory = (e) => {
	e.preventDefault();
	window.location = 'http://localhost:3000/review?name=' + value.value;
    };
    return (
        <div className="searchBar">
	    <form onSubmit={submitSelectCategory}>
		<Select
		    value={value}
                    options={optins}
                    styles={customStyles}
                    placeholder="Search"
                    openMenuOnClick={false}
		    onChange={onDropdownChange}
		/>
	    </form>
        </div>
    );
}

export default Search;
