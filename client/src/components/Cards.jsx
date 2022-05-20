import React from 'react';

import Card from"./Card";
import Loading from './Loading';

import style from "./styles/Cards.module.css";

const Cards = ({ countries }) => {
    return (
        <div className={style.cardContainer}>
            { 
                countries.length > 0 ? ( 
                    countries?.map((e) => {
                        return (
                            <Card
                                key={e.cca3}
                                id={e.cca3}
                                name={e.name}
                                flags={e.flags}
                                continents={e.continents}
                            />
                        );
                    })
                ) : (
                    <Loading/>
                )
            }
        </div>
    );
};

export default Cards;