//Aqui vamos a setear nuestro estado inicial
const initialState = {
    countries: [], // Almacenamos los paises que obtenemos en los case "GET_BY_NAME" y los filtros
    allCountries: [], // Aqui estarian todos los paises
    detail: [], // El detalle del pais
    activities: [] // Las actividades del pais
};

//Aqui las acctions van a saber que hacer.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_COUNTRIES":
            let c = state.countries;
            console.log(c);
           return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }

        case "GET_BY_NAME":
            let a = state.countries;
            console.log(a);
            return {
                ...state,
                countries: action.payload
            }

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

        case "FILTER_BY_REGION": {
            let allCountries = state.allCountries;

            let c = state.countries;
            console.log(c);

            let filteredRegion =
                action.payload === "All"
                    ? allCountries
                    : allCountries.filter((f) => f.continents === action.payload);      
            return {
                ...state,
                countries: filteredRegion,
            };
        }

        case "FILTER_BY_ACTIVITY":{
            let countrieactivity = state.allCountries;

            console.log(countrieactivity)

            let filteractivity = action.payload === "All" ? countrieactivity : countrieactivity.filter((f) => {
                return f.activities.some((a) => a.name === action.payload)
            });

            console.log(filteractivity)

            return {
                ...state, 
                countries: filteractivity
            }
        }

        case "ORDER_BY": {
            let sortCountries;
            let allCountries = state.allCountries;

            if (action.payload === "All") {
                return allCountries;
            };

            if (action.payload === "abc-asc") {
                sortCountries = state.countries.sort((a,b) => {
                    if (a.name > b.name) {
                        return 1;
                    };

                    if (a.name < b.name) {
                        return -1;
                    };

                    return 0;
                });
            };
            
            if (action.payload === "abc-des") {
                sortCountries = state.countries.sort((a,b) => {
                    if (b.name > a.name) {
                        return 1;
                    };

                    if (b.name < a.name) {
                        return -1;
                    };

                    return 0;
                });
            };

            if (action.payload === "pop-asc") {
                sortCountries = state.countries.sort((a, b) => {
                    return b.population - a.population;
                });
            };

            if (action.payload === "pop-des") {
                sortCountries = state.countries.sort((a, b) => {
                    return a.population - b.population;
                });
            };

            return {
                ...state,
                countries: sortCountries,
            };
        }

        case "POST_ACTIVITY": {
            return {
                ...state
            };
        }

        case "GET_ACTIVITIES":{
            return {
                ...state,
                activities: action.payload
            };
        }

        case "RESET_DETAIL":{
            return {
                ...state,
                detail: []
            };
        }

        default:
            return {
            ...state,    
        }
            
    };
};

export default reducer;