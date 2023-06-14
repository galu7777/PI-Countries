// import Nav from './components/Nav/Nav';

import { Route, Routes } from "react-router-dom"
import Activities from "./components/Activities/Activities"
import Countries from "./components/Countries/Countries"
import CreatedActivity from "./components/CreatedActivity/CreatedActivity"
import Detail from "./components/Detail/Detail"
import Nav from "./components/Nav/Nav"

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/activities" element={<Activities/> }/>
        <Route path="/home" element={<Countries/>}/>
        <Route path="/created" element={<CreatedActivity/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App