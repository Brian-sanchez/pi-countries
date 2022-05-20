//Aqui creamos la actividad con un post a activities. 
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../actions/index.js";

import styles from "./styles/CreateActivity.module.css";

const CreateActivity = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let countries = useSelector((state) => state.countries);

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        seasson: "",
        cca3: [], 
    });

    const [error, setError] = useState({}); 
    
    const validation = (input) => {
        const errors = {};
        
        if (!input.name) {
            errors.name = 'Name is required';
        };

        if (!input.difficulty) {
            errors.difficulty = 'Difficulty is required'
        };

        if (!input.duration) {
            errors.duration = 'Duration is required'
        };

        if (!input.seasson) {
            errors.seasson = 'Season is required'
        };

        return errors;
    };

    const disableSelectDifficulty = () => { // Solucionado PAAAA (Por mi :D)
        document.getElementById("s-difficulty").options[0].disabled = true;
    };

    const disableSelectDuration = () => { // Solucionado PAAAA (Por mi :D)
        document.getElementById("s-duration").options[0].disabled = true;
    };

    const disableSelectSeasson= () => { // Solucionado PAAAA (Por mi :D)
        document.getElementById("s-seasson").options[0].disabled = true;
    };

    const disableSelectCountries= () => { // Solucionado PAAAA (Por mi :D)
        document.getElementById("s-countries").options[0].disabled = true;
    };

    function handleInputChange(e) {
        e.preventDefault(); //Lo que hago con el e.preventDefault es recibir el evento y evitar lo que haria por defecto
        // para que luego asi ejecutar lo que le sigue a esta funcion y ya despues de eso se ejecutaria normalmente

        setInput((input) => {
            const newInput = { 
              ...input,
              [e.target.name]: e.target.value
            };
      
            const error = validation(newInput);
            setError(error);
            return newInput;
        });
    };

    function handleSelect(e) {
        setInput({
            ...input,
            cca3: [...input.cca3, e.target.value,] // e.target.value --> valor del input
        });
    };
    
    function handleSubmit(e) {
        e.preventDefault();

        if (!input.name || !input.difficulty || !input.duration || !input.seasson || input.cca3.length <= 0) {
            alert("Missing fields to fill!!"); 
        } else {
        dispatch(postActivity(input));
        alert("Activity created!");
        setInput({
            cca3: [],
            name: "",
            difficulty: "",
            duration: "",
            seasson: ""
        });

        navigate("/home");
        };
    };

    return (
        <div className={styles.ContainerActivity}>
            <Link to={"/home"}>
                <button className={styles.btn1} >Go Back</button>
            </Link>

            <div className={styles.ContainerActivity1}>
                <div className={styles.ContainerActivity2}>
                    <h3>Add activity:</h3>
                    <form onSubmit={handleInputChange}>
                        <input
                            onChange={(e)=>handleInputChange(e)}
                            name="name"
                            value={input.name}
                            type="text"
                            placeholder="Activity name..."
                            className={styles.Creator3}
                        />
                        {error.name && <p className={styles.error}>{error.name}</p>}
                    </form>

                    <form onSubmit={handleSubmit}>
                        <h3>Select difficulty:</h3>
                        <select className={styles.Selector} name="difficulty" id="s-difficulty" onChange={handleInputChange} onClick={disableSelectDifficulty}>
                            <option>Select Difficulty</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {error.difficulty && <p className={styles.error}>{error.difficulty}</p>}
                        

                        <h3>Select Duration:</h3>
                        <select className={styles.Selector} name="duration" id="s-duration" onChange={handleInputChange} onClick={disableSelectDuration}>
                            <option>Select Duration</option>
                            <option value="30">30 min</option>
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                            <option value="5">More than 5 hours</option>
                        </select>
                        {error.duration && <p className={styles.error}>{error.duration}</p>}

                        <h3>Select Seasson:</h3>
                        <select className={styles.Selector} name="seasson" id="s-seasson" onChange={handleInputChange} onClick={disableSelectSeasson}>
                            <option>Select Seasson</option>
                            <option value="Summer">Summer</option>
                            <option value="Spring">Spring</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                        </select>
                        {error.seasson && <p className={styles.error}>{error.seasson}</p>}

                        <h3>Select a Country or Countries:</h3>
                        <select className={styles.Selector} id="s-countries" onChange={handleSelect} onClick={disableSelectCountries}>
                            <option >Select Countries</option>
                            {
                                countries?.map((country) => { 
                                    return (
                                        <option key={country.cca3} value={country.cca3}>{country.name}</option>
                                    )
                                })
                            }
                        </select>
                        {error.cca3 && <p className={styles.error}>{error.cca3}</p>}

                        <div>
                            <h2>Countries added:</h2>
                            <div>
                                {input.cca3?.map((e)=>{return <h4 key={e} className={styles.countries}>{e}</h4>})}
                            </div>
                        </div>

                        <button className={styles.btn} disabled={Object.keys(error).length > 0 ? true : false} >Submit activity</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateActivity;