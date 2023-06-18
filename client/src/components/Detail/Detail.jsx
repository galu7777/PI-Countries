import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { searchById } from '../Redux/actions';
import MM from '../../assets/GIF_Mundo_Banderas.gif'
import './Detail.css';

function Detail({ countries }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(searchById(id))
  }, [searchById])
  
  console.log(countries)
  const country = countries[0];
  const Name = country?.name.charAt(0).toUpperCase() + country?.name.slice(1);
  const Capital = country?.capital.charAt(0).toUpperCase() + country?.capital.slice(1);

  const activities = country?.Activities;

  return (
    <div className="cont-detail">
      <div className="container-des">
        <div>
          <img src={MM} alt="RM" className="logo-detail"/>
        </div>
        <h5 className="desc">Id: {country?.id}</h5>
        <h5 className="desc">Name: {Name}</h5>
        <h5 className="desc">Continent: {country?.continent}</h5>
        <h5 className="desc">Capital: {Capital}</h5>
        <h5 className="desc">Population: {Number(country?.population).toLocaleString()}</h5>
        <div className='container-des'>
          <h5 className='title'> Activities </h5>
          {/* {
              activities.length !== 0 || !activities             
              ? activities.map((activity) => (
                <div key={activity?.id} className='ctn-activity'>
                  <h5 className='desc-act'>Activity: { activity?.name }</h5>
                  <h5 className='desc-act'>Season: { activity?.season }</h5>
                </div>
              )) : <h5 className='desc-reg-act'>There are no activities registered in { country?.name } </h5> 
          } */}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <table className="ctn-table-countries">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Season</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    activities.length !== 0 || !activities
                    ? activities.map((activity) => (
                      <tr key={activity}>
                        <td>
                          { activity.name }
                        </td>
                        <td>
                          { activity.season }
                        </td>
                      </tr>                      
                    )) : <h5 className='desc-reg-act'>There are no activities registered in { country?.name } </h5>
                  }
                </tbody>
              </table>
           </div>
          
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