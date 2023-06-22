import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createActivity } from '../Redux/actions';
import './CreatedActivity.css';

function CreatedActivity({ countries, createActivity }) {
  
  const navigate = useNavigate()
  const [newActivity, setNewActivity] = useState({
    countries: [],
    name: '',
    difficulty: '',
    season: '',
    duration: ''
  });

  const [error, setError] = useState('')
  const [errorSelectDifficulty, setErrorSelectDifficulty] = useState('')
  const [errorSelectSeason, setErrorSelectSeason] = useState('')
  const [errorSelectCountryId, setErrorSelectCountryId] = useState('')
  const [errorSelectDuration, setErrorSelectDuration] = useState('')

  const seasons = [
    { id: 0, name: 'Default' },
    { id: 1, name: 'Spring' },
    { id: 2, name: 'Summer' },
    { id: 3, name: 'Fall' },
    { id: 4, name: 'Winter' },
  ];
  
  const difficulties = [
    { value: 'Default' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
  ];

  const duration = [
    { value: 'Default' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10' },
    { value: '11' },
    { value: '12' }
  ];

  const nations = [ { id: 0, name: 'Default' }, ...countries ]

  const handleChangeName = (event) => {
    newActivity.name.length < 3
    ? setError('The name of the Activity must be greater than 3 characters')
    : setError('')

    setNewActivity({ ...newActivity, name: event.target.value });
  };

  const handleChangeDifficulty = (event) => {
    const selectedDifficulty = event.target.value;
    setNewActivity({ ...newActivity, difficulty: selectedDifficulty });
  
    if (selectedDifficulty === 'Default') {
      setErrorSelectDifficulty("You cannot select the 'Default' value to submit the form");
    } else {
      setErrorSelectDifficulty('');
    }
  };
  
  const handleChangeSeason = (event) => {
    const selectedSeason = event.target.value;
    setNewActivity({ ...newActivity, season: selectedSeason });
  
    if (selectedSeason === 'Default') {
      setErrorSelectSeason("You cannot select the 'Default' value to submit the form");
    } else {
      setErrorSelectSeason('');
    }
  };
  
  const handleChangeDuration = (event) => {
    const selectedDuration = event.target.value;
    setNewActivity({ ...newActivity, duration: selectedDuration });
  
    if (selectedDuration === 'Default') {
      setErrorSelectDuration("You cannot select the 'Default' value to submit the form");
    } else {
      setErrorSelectDuration('');
    }
  };
  

  const handleChangeCountryId = (event) => {    
    const selectedCountryId = event.target.value;
    if (!newActivity.countries.includes(selectedCountryId)) {
      setNewActivity((prevState) => ({
        ...prevState,
        countries: [...prevState.countries, selectedCountryId],
      }));
    }
    
    if (selectedCountryId === '0') {
      setErrorSelectCountryId("You cannot select the 'Default' value to submit the form");
    } else {
      setErrorSelectCountryId('');
    }

  };

  const handleRemoveCountry = (countryId) => {
    setNewActivity((prevState) => ({
      ...prevState,
      countries: prevState.countries.filter((id) => id !== countryId),
    }));
  };  
  

  const submitHandler = async (event) => {
    event.preventDefault();

    if (newActivity.countries.length === 0) {
      alert("Please select at least one country.");
      return;
    }    
    if (newActivity.duration.length === 0) {
      alert("Please select the duration.");
      return;
    }

    newActivity.countries.forEach((countryId) => {
      const activityData = {
        ...newActivity,
        CountryId: countryId,
      };
      createActivity(activityData);
    });
    alert('Your activity has been created!');
    navigate('/home')
  };
  
  return (
    <div className="create-container">
      <div className="cnt">

        <h1 style={{ color: 'white', marginTop: '5%' }}>Create Activity</h1>

        <form onSubmit={submitHandler} className="create-form">
          <div className="ctn-input">
            <div className="input-container">
              <label htmlFor="name" className="top-label">
                Name:
              </label>
              <input 
                type="text" 
                className="input"
                name='name'
                placeholder='Name of Activity'
                // value={newActivity.name}
                onChange={handleChangeName}
                autoFocus 
               />
               {error && <p style={{color: 'red', fontSize: '14px'}}>{error}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="difficulty" className="top-label">
                Difficulty:
              </label>
              <div className="select">
                <select 
                    className="select-origin"
                    value={newActivity.difficulty}
                    onChange={handleChangeDifficulty}
                >
                  {difficulties.map((difficulty, index) => (
                    <option key={index} value={difficulty.value}>
                      {difficulty.value}
                    </option>
                  ))}
                </select>
              </div>
              {errorSelectDifficulty && <p style={{color: 'red', fontSize: '14px'}}>{errorSelectDifficulty}</p>}
              
            </div>
            
            <div className='input-container'>
                <label htmlFor="difficulty" className="top-label">
                   Seasons:
                </label>
                <div className="select">
                <select 
                  className="select-origin"
                  value={ newActivity.season } 
                  onChange={handleChangeSeason}
                >
                    {seasons.map((season, index) => (
                        <option key={index} value={season.name}>
                            {season.name}
                        </option>
                    ))}
                </select>
                </div>
                {errorSelectSeason && <p style={{color: 'red', fontSize: '14px'}}>{errorSelectSeason}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="countries" className="top-label">
                Countries:
              </label>
              <div className="select">
                <select
                  className="select-origin"
                  value={newActivity.countries}
                  onChange={handleChangeCountryId}
                >
                  {nations.map((nation, index) => (
                    <option key={index} value={nation.id}>
                      {nation.name}
                    </option>
                  ))}
                </select>
              </div>
              {errorSelectCountryId && <p style={{color: 'red', fontSize: '14px'}}>{errorSelectCountryId}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="countries" className="top-label">
                Duration:
              </label>
              <div className="select">
                <select
                  className="select-origin"
                  value={newActivity.duration}
                  onChange={handleChangeDuration}
                >
                  {duration.map((duration, index) => (
                    <option key={index} value={duration.value}>
                      {duration.value} hours
                    </option>
                  ))}
                </select>
              </div>
              {errorSelectDuration && <p style={{color: 'red', fontSize: '14px'}}>{errorSelectDuration}</p>}
            </div>
                    
            

            <div className='btn-create-container'>
                <button 
                  type='submit' 
                  className='btn' 
                  disabled={ 
                    error !== '' || 
                    errorSelectDifficulty !== '' || 
                    errorSelectSeason !== '' ||
                    errorSelectDuration !== '' ||
                    errorSelectCountryId !== ''
                  }
                >
                  Create
                </button>
            </div>            

          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <table className="ctn-table-countries">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    newActivity.countries.map((countryId) => (
                      <tr key={countryId}>
                        <td>
                          { countries.find((country) => country.id === countryId)?.name }
                        </td>
                        <td
                          className='td-cursor' 
                          type='button'
                          onClick={() => handleRemoveCountry(countryId)}
                        >
                          X
                        </td>
                       </tr>                      
                    ))
                  }
                </tbody>
              </table>
          </div>

        </form>

      </div>
    </div>
  );
}

CreatedActivity.propTypes = {
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ),
    createActivity: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
    return {
        countries: state.countries
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createActivity: (activity) => dispatch(createActivity(activity))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatedActivity);
