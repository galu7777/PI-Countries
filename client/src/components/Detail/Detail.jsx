import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { searchById } from '../Redux/actions';
import MM from '../../assets/GIF_Mundo_Banderas.gif'
import './Detail.css';

function Detail({ countries }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(searchById(id))
  }, [searchById])
  
  const country = countries[0];
  console.log(country)
  const activities = country?.Activities;
  console.log(activities)

  return (
    <div className="cont-detail">
      <div className="container-des">
        <div>
          <img src={MM} alt="RM" className="logo-detail"/>
        </div>
        <h5 className="desc">Id: {country?.id}</h5>
        <h5 className="desc">Name: {country?.name}</h5>
        <h5 className="desc">Continent: {country?.continent}</h5>
        <h5 className="desc">Capital: {country?.capital}</h5>
        <h5 className="desc">Population: {Number(country?.population).toLocaleString()}</h5>
        <div className='container-des'>
          <h5 className='title'> Activities </h5>
          {
              activities.length !== 0 || !activities             
              ? activities.map((activity) => (
                <div key={activity?.id} className='ctn-activity'>
                  <h5 className='desc-act'>Activity: { activity?.name }</h5>
                  <h5 className='desc-act'>Season: { activity?.season }</h5>
                </div>
              )) : <h5 className='desc'>There are no activities registered in { country?.name } </h5> 
          }
        </div>
      </div>
      
    
      {/* <div style={{margin: '50px'}}/> */}
      <div className="container-img">
        <img src={country?.image_flag} alt={country?.name} className='img-detail'/>
      </div>        
    </div>
        
  )
}

Detail.propTypes = {
    countries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          image_flag: PropTypes.string.isRequired,
          continent: PropTypes.string.isRequired,
          capital: PropTypes.string.isRequired,
          population: PropTypes.string.isRequired,
          Activities: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              name: PropTypes.string.isRequired,
              season: PropTypes.string.isRequired
            })
          ),
        })
    ),
    searchById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchById: (id) => dispatch(searchById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)