//Aqui vamos  a hacer el indice de paginas.
import React from "react";

import style from "./styles/Pagination.module.css";

const Pagination = ({ countriesPerPage, countries, currentPage, paged }) => {
    const pageNumbers = [];
    const pageQuantity = Math.ceil(countries.length / countriesPerPage); // calculo la cantidad de páginas que voy a tener en función de la cantidad de paises
    
    for (let i = 1; i < pageQuantity + 1; i++) {
        pageNumbers.push(i);
    };

    if (pageNumbers.length === 28) { //* --> cantidad de numeros de paginas con 9 paises
      pageNumbers.length = 25 //* --> cantidad de paginas que tendria que tener en realidad
    } else if (pageNumbers.length === 7) {
      pageNumbers.length = 6;
    } 
    
    if (pageNumbers.length === 6) {
      pageNumbers.length = 5;
    }

    return (
        <div>
        <nav>
          <ul className={style.container}>
            {pageNumbers?.map((number) => (
              <li key={number} className={style.number}>
                <div
                  className={
                    currentPage === number ? style.crumb_active : style.crumb
                  }
                  onClick={() => paged(number)}
                >
                  {number}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
};

export default Pagination;