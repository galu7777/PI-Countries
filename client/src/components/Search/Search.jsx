import { useState } from 'react';
import { connect, useDispatch } from  'react-redux';
import PropTypes from 'prop-types';
import { searchByName, searchById } from '../Redux/actions';
import './Search.css';

function Search() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearchQuery = (event) => {
      setSearchQuery(event.target.value)
  };
    
  const onSearch = () => {
    if(searchQuery.length === 3) {
      dispatch(searchById(searchQuery))
    } else dispatch(searchByName(searchQuery))
  };

  return (
    <div className='cont-input'>
        <input type="search" className='input' value={searchQuery} onChange={handleChangeSearchQuery}/>
        <button className='btn-search' onClick={onSearch}>Search</button>
    </div>
  )
}

Search.PropsTypes = {
  searchByName: PropTypes.func.isRequired,
  searchById: PropTypes.func.isRequired
}

const mapDispacthToProps = (dispacth) => {
  return {
    searchByName: (name) => dispacth(searchByName(name)),
    searchById: (id) => dispacth(searchById(id))
  }
};

export default connect(null, mapDispacthToProps)(Search)