import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import Air from '../../assets/Air.gif';
import './LandingPage.css';

function LandingPage({ setAccess, access }) {

  const navigate = useNavigate();
  
  const Next = () => {
    !access
    ? setAccess(true)
    : navigate('/home')
  };

  return (
    <div className='ctn-gen-lan'>
        <div className='ctn-landing'>
            <div>
                <h1 style={{ color: 'white' }} className='title-lp'>Welcome !!!</h1>
                <div className="img-ctn">
                    <img src={Air} alt="Air" className='air-gif'/>
                </div>
                <div>
                    <h3 className='text'>Explore more than 200 countries and register your activities in your favorite destinations.</h3>
                </div>
                <div className="ctn-button">
                    <button
                        onClick={Next}
                        className='btn-landing'
                    >
                        <span>Next</span><i></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

LandingPage.propTypes = {
    setAccess: PropTypes.func.isRequired,
    access: PropTypes.bool.isRequired,
}

export default LandingPage