import {
    GET_COUNTRIES,
    SET_CURRENT_PAGE,
    NEXT_PAGE,
    PREVIOUS_PAGE,
    FILTER,
    ORDER,
    ORDER_ALPHABETICALLY,
    SEARCH_BY_NAME,
    SEARCH_BY_ID,
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
  } from "./actions-types";
  
  const stateInitial = {
    countries: [],
    allCountries: [],
    activities: [],
    currentPage: 1,
    pageSize: 10,
  };
  
  const reducer = (state = stateInitial, { type, payload }) => {
    switch (type) {
      case GET_COUNTRIES:
        return {
          ...state,
          countries: payload,
          allCountries: payload,
        };
  
      case SEARCH_BY_NAME:
        return {
          ...state,
          countries: payload,
          currentPage: 1
        };
  
      case SEARCH_BY_ID:
        return {
          ...state,
          countries: payload,
        };
  
      case CREATE_ACTIVITY:
        return {
          ...state,
          activities: payload,
        };
  
      case DELETE_ACTIVITY:
        return {
          ...state,
          activities: payload,
        };
  
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: payload,
        };
  
      case NEXT_PAGE: {
        const totalPages = Math.ceil(state.countries.length / state.pageSize);
        if (state.currentPage < totalPages) {
          return {
            ...state,
            currentPage: state.currentPage + 1,
          };
        }
        return state;
      }
  
      case PREVIOUS_PAGE:
        if (state.currentPage > 1) {
          return {
            ...state,
            currentPage: state.currentPage - 1,
          };
        }
        return state;
  
      case FILTER: {
        let filteredCountries = [...state.allCountries];
  
        if (payload === "activity") {
          filteredCountries = filteredCountries.filter(
            (country) => country.Activities.length > 0
          );
        } else if (payload !== "allCountries" && payload !== "default") {
          filteredCountries = filteredCountries.filter(
            (country) => country.continent === payload
          );
        }
  
        return {
          ...state,
          countries: filteredCountries,
        };
      }
  
      case ORDER: {
        const orderedCountries = [...state.countries];
  
        if (payload === "A") {
          orderedCountries.sort((a, b) => a.population - b.population);
        } else if (payload === "D") {
          orderedCountries.sort((a, b) => b.population - a.population);
        }
  
        return {
          ...state,
          countries: orderedCountries,
        };
      }
  
      case ORDER_ALPHABETICALLY: {
        const orderedCountries = [...state.countries];
  
        if (payload === "alfabeticamente") {
          orderedCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if ( payload === "Z A"){
          orderedCountries.sort((a, b) => b.name.localeCompare(a.name))
        }


  
        return {
          ...state,
          countries: orderedCountries,
        };
      }
  
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  