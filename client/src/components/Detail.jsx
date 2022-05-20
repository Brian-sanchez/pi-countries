import React,{ useEffect} from 'react';
import {useSelector, useDispatch} from"react-redux"
import { getDetail, resetDetail } from '../actions/index';
import {useParams, Link} from "react-router-dom";

import styles from "./styles/Detail.module.css";

const Detail = () => { 
    const { id } = useParams();
    const details = useSelector((state) => state.detail);
    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(getDetail(id));

        return function() {
            dispatch(resetDetail()); //Accion para que no queden los datos anteriores cuando abrimos otro pais en Detail
        };
    }, [dispatch, id]);

    return (
        <div className={styles.AllContainer}>
            <div className={styles.btncontainer}>
                <Link to="/home" >
                    <button className={styles.btn1}> Go Back</button>
                </Link>
            </div>

            <div className={styles.DetailContainer}>
                <div className={styles.DetailContainer1}>
                    <img className={styles.img1} src={details.flags} alt={details.name}/>
                    <h1>{details.name}</h1>
                    
                    <div className={styles.details}>
                        <div>
                            <h2>Acronym:</h2>
                            <h4>{details.cca3}</h4>
                            <h2>Continent :</h2>
                            <h4>{details.continents}</h4>
                        </div>

                        <div>
                            <h2>Capital :</h2>
                            <h4>{details.capital}</h4>
                            <h2>Sub Region :</h2>
                            <h4>{details.subregion}</h4>
                        </div>

                        <div>
                            <h2>Area :</h2>
                            <h4>{details.area} Km²</h4>
                            <h2>Population :</h2>
                            <h4>{details.population}</h4>
                        </div>
                    </div>

                    <div className={styles.ActivityContainer}>
                        <h1>Activities :</h1>

                        {
                            details.activities?.map((e)=>{
                                return (
                                    <div key={e.id} className={styles.activity}>
                                        <h3>{e.name}</h3>
                                        <p>Duration: {e.duration} hours</p>
                                        <p>Difficulty: {e.difficulty}</p>
                                        <p>Seasson: {e.seasson}</p>
                                    </div>
                                )
                            })
                        }

                        <Link to="/create">
                            <button className={styles.btn}>Create Activity</button>
                        </Link>
                    </div> 
                </div>
            </div>
        </div>
    ); 
};

export default Detail;