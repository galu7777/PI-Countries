// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Search from '../Search/Search'
import './Nav.css'

function Nav() {
  return (
      <div>
        <nav>
          <div className="container-button">
            <button className="btn-nav">
              <NavLink to="/home" className="link-button"><span>Home</span><i></i></NavLink>
            </button>
            <button className="btn-nav" style={{marginLeft: '8%'}}>
              <NavLink to="/activities" className="link-button"><span>Activities</span><i></i></NavLink>
            </button>
          </div>
                    
          <Search/>          

        </nav>
      </div>    
  )
}

export default Nav