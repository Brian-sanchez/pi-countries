import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getCountries, filterByRegion, orderBy, filterByActivity } from '../actions/index';

import Cards from "./Cards";
import NavBar from "./NavBar";
import Pagination from "./Pagination";

import styles from "./styles/Home.module.css";

const Home = () =>{
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    
    // Aca defino estados locales
    const [/*order*/, setOrder] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1); 
    let countriesPerPage = 0;
    if (currentPage === 1) countriesPerPage = 9;
    if (currentPage >= 2) countriesPerPage = 10;
 
    const indexLastCountry = currentPage * countriesPerPage; // 9
    const indexFirtsCountry = indexLastCountry - countriesPerPage; // 0
    const currentCountry = countries.slice(indexFirtsCountry, indexLastCountry); // Esta constante tiene los paises que estan en la pagina actual

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    const paged = (paged) => {
        setCurrentPage(paged);
    };
    
    const handleFilterByRegion = (e) => {
        e.preventDefault();
        
        dispatch(filterByRegion(e.target.value));
        setCurrentPage(1);
    };
    
    const handleSort = (e) => {
        e.preventDefault();

        dispatch(orderBy(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };

    const handlerFilterByActivity = (e) => {
        e.preventDefault();

        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
    };

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(getCountries());
    }
    
    return (
        <div className={styles.homeContainer}>
            <NavBar
            handlerFilterByRegion={handleFilterByRegion}
            handleSort={handleSort}
            handlerFilterByActivity={handlerFilterByActivity}
            handleClick={handleClick}
            />
            
            <Cards countries={currentCountry}/>
            
            <Pagination
            countriesPerPage={countriesPerPage}
            countries={countries}
            currentPage={currentPage}
            paged={paged}
            />
        </div>
    );
};

export default Home;