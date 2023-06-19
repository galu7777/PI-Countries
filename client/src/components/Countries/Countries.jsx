import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import { 
  getCountries, 
  nextPage, 
  previousPage, 
  filterCountries, 
  orderCountries, 
  orderAlphabetically 
} from '../Redux/actions';
import './Countries.css';
import { NavLink } from 'react-router-dom';
import CreatedActivity from '../CreatedActivity/CreatedActivity';

function Countries({ 
  countries, 
  currentPage, 
  pageSize, 
  totalPages,
  getCountries, 
  nextPage, 
  previousPage, 
  filterCountries, 
  orderCountries, 
  orderAlphabetically }) {  

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const handleNextPage = () => {
    nextPage();
  };

  const handlePreviousPage = () => {
    previousPage();
  };

  const handleOrder = (event) => {
    orderCountries(event.target.value);
  };

  const handleAlpha = (event) => {
    orderAlphabetically(event.target.value);
  };

  const handleFilter = (event) => {
    filterCountries(event.target.value);
  };


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // const currentPageObjects = countries.slice(startIndex, endIndex);
  const currentPageObjects = countries && Array.isArray(countries) ? countries.slice(startIndex, endIndex) : [];
  console.log(countries)
        
  return (
    <div className='container'>
      <h1 style={{ color: 'white', marginTop: '2%' }}>Home</h1>
      <div className="container-select">
        <div className="select">
          <select onChange={handleOrder} className="select-origin">
            <option value="default">default</option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
        </div>

        <div className='select'>
          <select onChange={handleAlpha} className="select-origin">
            <option value="default">default</option>
            <option value="alfabeticamente">ordenar alfabeticamente</option>
          </select>
        </div>

        <div className="select">
          <select onChange={handleFilter} className="select-origin">
            <option value="default">default</option>
            <option value="asia">asia</option>
            <option value="europe">europe</option>
            <option value="oceania">oceania</option>
            <option value="africa">africa</option>
            <option value="north america">north america</option>
            <option value="south america">south america</option>
            <option value="antarctica">antarctica</option>
            <option value="allCountries">all Countries</option>
            <option value="activity">Activity</option>
            {/* <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
            <option value="allCharacters">allCharacters</option> */}
          </select>
        </div>
        <NavLink to='/created' element={<CreatedActivity/>}>
          <button className='btn-search'>Create Activity</button>
        </NavLink>
      </div>
      <div className='card-container'>
        {currentPageObjects.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            image_flag={country.image_flag}
            name={country.name}
            continent={country.continent}
          />
        ))}
      </div>
      <div className='container-btn'>
        <div>
          <button className="btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
        </div>
        <div>
          <button className="btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

Countries.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image_flag: PropTypes.string,
      name: PropTypes.string,
      continent: PropTypes.string,
    })
  ),
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  getCountries: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  filterCountries: PropTypes.func.isRequired,
  orderCountries: PropTypes.func.isRequired,
  orderAlphabetically: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    totalPages: Array.isArray(state.countries)
      ? Math.ceil(state.countries.length / state.pageSize)
      : 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => dispatch(getCountries()),
    nextPage: () => dispatch(nextPage()),
    previousPage: () => dispatch(previousPage()),
    filterCountries: (continent) => dispatch(filterCountries(continent)),
    orderCountries: (order) => dispatch(orderCountries(order)),
    orderAlphabetically: (order) => dispatch(orderAlphabetically(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
