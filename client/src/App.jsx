// import Nav from './components/Nav/Nav';

import { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Countries from "./components/Countries/Countries"
import CreatedActivity from "./components/CreatedActivity/CreatedActivity"
import Detail from "./components/Detail/Detail"
import LandingPage from "./components/LandingPage/LandingPage"
import Nav from "./components/Nav/Nav"

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false)
  
  useEffect(() => {
    if(access === false) {
      navigate('/')
    } else {
      navigate('/home')
    }
  }, [access])

  return (
    <div>
      {
        location.pathname !== '/' && <Nav/>
      }
      <Routes>
        <Route path="/" element={<LandingPage setAccess={ setAccess } access={access}/> }/>
        <Route path="/home" element={<Countries/>}/>
        <Route path="/created" element={<CreatedActivity/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App