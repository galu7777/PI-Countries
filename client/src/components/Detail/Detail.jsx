import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteActivity, searchById } from '../Redux/actions';
import MM from '../../assets/GIF_Mundo_Banderas.gif'
import './Detail.css';

function Detail({ countries, deleteActivity, searchById }) {
  const { id } = useParams();
  const navigate = useNavigate()  

  useEffect(() => {
    searchById(id)
  }, [searchById])
  
  const country = countries[0];
  const Name = country?.name.charAt(0).toUpperCase() + country?.name.slice(1);
  const Continent = country?.continent.charAt(0).toUpperCase() + country?.continent.slice(1);
  const Capital = country?.capital.charAt(0).toUpperCase() + country?.capital.slice(1);
  const SubRegion = country?.subregion.charAt(0).toUpperCase() + country?.subregion.slice(1);

  const activities = country?.Activities;

  const handlerDeleteActivity = (id) => {
    console.log(id)
    deleteActivity(id)
    alert('activity successfully deleted')
    navigate('/home')
  }

  return (
    <div className="cont-detail">
      <div className="container-des">
        <div className='ctn-logo'>
          <img src={MM} alt="RM" className="logo-detail"/>
        </div>
        <h5 className="desc">Id: {country?.id}</h5>
        <h5 className="desc">Name: {Name}</h5>
        <h5 className="desc">Continent: {Continent}</h5>
        <h5 className="desc">Capital: {Capital}</h5>
        <h5 className="desc">Sub Region: {SubRegion}</h5>
        <h5 className="desc">Area: {Number(country?.area).toLocaleString()} km²</h5>
        <h5 className="desc">Population: {Number(country?.population).toLocaleString()}</h5>
        <div className='container-des'>
          <h5 className='title'> Activities </h5>
          
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {
                  activities.length !== 0 || !activities
                  
                  ? <table className="ctn-table-detail">
                      <thead>
                        <tr>
                          <th>Activity</th>
                          <th>Season</th>
                          <th>Duration</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          
                          activities.map((activity) => (
                            <tr key={activity}>
                              <td>
                                { activity.name }
                              </td>
                              <td>
                                { activity.season }
                              </td>
                              <td>
                                { activity.duration } Hours
                              </td>
                              <td
                                className='td-cursor'
                                type="button"
                                onClick={() => handlerDeleteActivity(activity.id)}
                              >
                                  X
                              </td>
                            </tr>                      
                          ))
                        }
                      </tbody>
                    </table>

                : <h5 className='desc-reg-act'>There are no activities registered in { country?.name } </h5>
              }
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
          subregion: PropTypes.string.isRequired,
          area: PropTypes.string.isRequired,
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
    searchById: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchById: (id) => dispatch(searchById(id)),
        deleteActivity: (id) => dispatch(deleteActivity(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)