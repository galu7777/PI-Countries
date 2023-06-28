import PropTypes from 'prop-types'
import Detail from '../Detail/Detail';
import { NavLink } from 'react-router-dom';
import './Card.css'

function Card({ id, image_flag, name, continent}) {
  // const formatPopulation = Number(population).toLocaleString();
  const Name = name ? name.charAt(0).toUpperCase() + name.slice(1): ' ';
  
  return (
    <div className='card'>
        <p className='text-card'>{ id }</p>
        <NavLink to={`/detail/${id}`} element={ <Detail/> } style={{ textDecoration: 'none' }}>
          <h1 className='title-card'>{ Name }</h1>
        </NavLink>
        <div className='image-container'>
            <img src={ image_flag } alt="flag" className='img'/>
        </div>
        <h2 className='text-card'>{ continent }</h2>
        {/* <h2 className='text-card'>population: { formatPopulation }</h2> */}
    </div>
  )
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    image_flag: PropTypes.string,
    name: PropTypes.string,
    continent: PropTypes.string,
    population: PropTypes.string.isRequired,
}

export default Card;