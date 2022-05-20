import axios from "axios";
import { ACTIVITIES_URL, ALL_COUNTRIES_URL, COUNTRIES_NAME, COUNTRIES_ID } from "./constants";

export function postActivity(newActivity) {
    try {
        const activity = axios.post(ACTIVITIES_URL, newActivity);

        return {
            type: "POST_ACTIVITY",
            payload: activity
        };
    } catch (error) {
        console.log(error);
    };
};

export function getActivities() {
    return async (dispatch) => {
        try {
            const res = await  axios.get(ACTIVITIES_URL);
            dispatch({ type: "GET_ACTIVITIES", payload: res.data });
        } catch (error) {
            console.log("Fallo getActivities action");
        };
    };
};

//GET PARA TRAER TODOS LOS PAISES. Aqui es donde se conecta el Back con el Front
export function getCountries() {
    return async (dispatch) => {
        try {
            const res= await  axios.get(ALL_COUNTRIES_URL);
            dispatch({ type: "GET_COUNTRIES", payload: res.data });
        } catch (error) {
            alert("Fallo getCountries action");
        };
    };
};

export function getByName(name) {
    return async (dispatch) => {
        try {
            const res = await axios.get(COUNTRIES_NAME + name);
            dispatch({ type: "GET_BY_NAME", payload: res.data });
        } catch (error) {
            alert("No se encontraron paises con ese nombre");
        };
    };
};

export function getDetail(id) {
    return async(dispatch) => {
        try {
            const res = await axios.get(COUNTRIES_ID + id);
            dispatch({ type: "GET_DETAIL", payload: res.data });
        } catch (error) {
            alert("Fallo getDetail action");
        };
    };
};

export function filterByRegion(payload) {
    try {
        return {
            type: "FILTER_BY_REGION",
            payload,
        };
    } catch (error) {
        console.log("Fallo filterByRegion");
    };
};

export function filterByActivity(payload) {
    try {
        return {
            type: "FILTER_BY_ACTIVITY",
            payload,
        };
    } catch (error) {
        console.log("Fallo filterByActivity");
    };
};

export function orderBy(payload) {
    return async (dispatch) => {
        try {   
            dispatch({
                type: "ORDER_BY",
                payload,
            });
        } catch (error) {
            console.log(error)
        };
    };
};

export function resetDetail() {
    return {
        type: "RESET_DETAIL"
    };
};

