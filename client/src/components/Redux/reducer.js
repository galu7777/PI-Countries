import { GET_COUNTRIES, 
         SET_CURRENT_PAGE, 
         NEXT_PAGE, 
         PREVIOUS_PAGE, 
         FILTER, 
         ORDER, 
         ORDER_ALPHABETICALLY, 
         SEARCHBYNAME,
         SEARCHBYID,
         CREATEACTIVITY
        } from "./actions-types";

const stateInitial = {
    countries: [],
    allCountries: [],
    activities: [],
    currentPage: 1,
    pageSize: 10
};

const reducer = (state = stateInitial, { type, payload }) => {
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: payload,
                allCountries: payload
            };

        case SEARCHBYNAME:
            return {
                ...state,
                countries: payload,
            };

        case SEARCHBYID:
            return {
                ...state,
                countries: payload,
            };

        case CREATEACTIVITY:
            return {
                ...state,
                activities: payload
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload
            };

        case NEXT_PAGE: {
            const totalPages = Math.ceil(state.countries.length / state.pageSize);
            if(state.currentPage < totalPages) {
                return {
                    ...state,
                    currentPage: state.currentPage + 1
                };
            }
            return state;
        }

        case PREVIOUS_PAGE:
            if(state.currentPage > 1) {
                return {
                    ...state,
                    currentPage: state.currentPage - 1
                };
            }
            return state;

        case FILTER: {
            if( payload === 'activity' ){
                const allActivitiesFiltered = state.allCountries.filter((country) => country.Activities.length > 0)
                return {
                    ...state,
                    countries:
                        allActivitiesFiltered
                }
            }
             const allCountriesFiltered = state.allCountries.filter((country) => country.continent === payload)
            // const allCountriesFiltered = state.countries.filter((country) => country.Activity === payload)
                return {
                    ...state,
                    countries: 
                        payload === 'allCountries' || payload === 'default'
                        ? [...state.allCountries]
                        : allCountriesFiltered
               }
        }   
    
        case ORDER: {
            const allCountriesCopy = [...state.allCountries]
                return {
                    ...state,
                    countries: payload === 'A'
                    ? allCountriesCopy.sort((a, b) => a.population - b.population)
                    : payload === 'default'
                      ? allCountriesCopy
                      : allCountriesCopy.sort((a, b) => b.population - a.population)
                }
        }

        case ORDER_ALPHABETICALLY: {
            const allCountriesCopy = [...state.allCountries];            
            return {
              ...state,
              countries: payload === 'alfabeticamente'
               ? allCountriesCopy.sort((a, b) => a.name.localeCompare(b.name))
               : allCountriesCopy
            };
        }                        
          

    
        default:
            return { ...state }
    }
}

export default reducer;