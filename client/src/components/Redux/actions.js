import axios from 'axios';
import { GET_COUNTRIES,
         SEARCHBYNAME,         
         SEARCHBYID, 
         SET_CURRENT_PAGE, 
         NEXT_PAGE, 
         PREVIOUS_PAGE, 
         FILTER, 
         ORDER,
         ORDER_ALPHABETICALLY,
         CREATEACTIVITY
         } from './actions-types';

export const getCountries = () => {
    return async(dispatch) => {
        try {
            const response = await axios('http://localhost:3001/countries');
            const data = response.data;
            dispatch({ type: GET_COUNTRIES, payload: data });
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
};

export const searchByName = (name) => {
    return async (dispatch) =>{
        try {
            const response = await axios(`http://localhost:3001/countries/search?name=${name}`);
            const data = response.data;
            dispatch({ type: SEARCHBYNAME, payload: data })
        } catch (error) {
            console.log('Error: ', error)
        }
    };
}

export const searchById = (id) => {
    return async (dispatch) =>{
        try {
            const response = await axios(`http://localhost:3001/countries/${id}`);
            const data = response.data;
            dispatch({ type: SEARCHBYID, payload: data })
        } catch (error) {
            console.log('Error: ', error)
        }
    };
}

export const createActivity = (Activity) => {
    const endpoint = 'http://localhost:3001/countries';
    return async (dispatch) => {
        try {
            const response = await axios.post(endpoint, Activity);
            const data = response.data;
            dispatch({ type: CREATEACTIVITY, payload: data })
        } catch (error) {
            console.log('Error al crear la activity: ', error )
        }
    }
}


export const setCurrentPage = (page) => {
    return { type: SET_CURRENT_PAGE, payload: page };
};

export const nextPage = () => {
    return { type: NEXT_PAGE };
};

export const previousPage = () => {
    return { type: PREVIOUS_PAGE };
};

export const filterCountries = (continent) => {
    return { type: FILTER, payload: continent }
}

export const orderCountries = (order) => {
    return { type: ORDER, payload: order }
};

export const orderAlphabetically = (order) => {
    return { type: ORDER_ALPHABETICALLY, payload: order }
};
