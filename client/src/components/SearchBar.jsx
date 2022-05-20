import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions/index";

import styles from "./styles/SearchBar.module.css"

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChangeName = (e) => {
        e.preventDefault();

        setName(e.target.value);
    };

    function handleSubmitName(e) {
        if (name.length === 0) {
            e.preventDefault();

            alert("No ha insertado ningun Pais");
        } else if (name.match(/[|\\/~^:.,;?!&%$@*+_-]/)) {
            alert("Don't write special characters")
        } else if (name > 0) {
            alert("Don't write numbers")
        } else {
            e.preventDefault();

            dispatch(getByName(name));
            setName("");
            e.target.reset();   
        };
    };

    return (
        <form onSubmit={(e) => handleSubmitName(e)}>
            <input className={styles.searchBar}
            onChange={(e) => handleInputChangeName(e)}
            type="text"
            placeholder="Country..."
            title= "Only numbers and leters"
            />
            
            <button className={styles.buttonSearch}>Search</button>
        </form>
    );
};

export default SearchBar;