//Aqui creamos el modelo de la card que le pasa los valores por props desde Cards
import React from "react";
import { Link } from "react-router-dom";

import style from "./styles/Card.module.css";

const Card =({ id, name, flags, continents }) =>{
    return(
        <Link to={`/countries/${id}`} style={{ textDecoration: 'none' }}>
            <div className={style.container}>
                <div className={style.card}>
                    <img className={style.imgcard} src={flags} alt={name}/>
                    <h3>{name}</h3>
                    <p>{id}</p>
                    <p>{continents}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;