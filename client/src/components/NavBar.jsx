import React , {useEffect}from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getActivities } from "../actions/index";
import SearchBar from "./SearchBar";

import styles from "./styles/NavBar.module.css";

const NavBar = ({ handlerFilterByRegion, handleSort, handlerFilterByActivity, handleClick }) => {
    const activities = useSelector((state) => state.activities);
    const dispatch = useDispatch();

    const disableOption = () => { //* Este lo que hara sera desabilitar la primera opcion.
        document.getElementById("orderBy").options[0].disabled = true;
    };

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch]);

    return (
        <div className={styles.navContainer}>
            <div className={styles.searchBar}>
                <SearchBar/>
            </div>

            <div className={styles.creatorAndRefresh}>
                <Link to="/create">
                    <button className={styles.Creator}>Activity Creator</button>
                </Link>

                <button className={styles.refresh} onClick={handleClick}>Refresh Countries</button> 
            </div>   
            
            <div className={styles.filters}> 
                <select className={styles.Creator1} onChange={(e)=> handlerFilterByRegion(e)}>
                    <option value="All">All Continents</option>
                    <option value="Americas">America</option>
                    <option value="Europe">Europe</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Asia">Asia</option>
                </select>

                <select id="orderBy" className={styles.Creator1} onChange={(e) => handleSort(e)} onClick={disableOption}>
                    <option value="All">Order By</option>
                    <option value="abc-asc">from A to Z</option>
                    <option value="abc-des">from Z to A</option>
                    <option value="pop-asc">Population ↑</option>
                    <option value="pop-des">Population ↓</option>
                </select>
                
                <select className={styles.Creator1} onChange={(e)=> handlerFilterByActivity(e)}>
                    <option value="All">All Activities</option>
                    {
                        activities?.map((e) => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    );
};

export default NavBar;