import PropTypes from 'prop-types'
import Detail from '../Detail/Detail';
import { NavLink } from 'react-router-dom';
import './Card.css'

function Card({ id, image_flag, name, continent, population }) {
  const formatPopulation = Number(population).toLocaleString();
  return (
    <div className='card'>
        <p>{ id }</p>
        <NavLink to={`/detail/${id}`} element={ <Detail/> }>
          <h1>{ name }</h1>
        </NavLink>
        <div className='image-container'>
            <img src={ image_flag } alt="flag" className='img'/>
        </div>
        <h2>{ continent }</h2>
        <h2>population: { formatPopulation }</h2>
    </div>
  )
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    image_flag: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    continent: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired
}

export default Card;