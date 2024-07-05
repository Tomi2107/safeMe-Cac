/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'
import Registro from './components/Registro'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Principal } from "./components/Principal.jsx"

function App() {

return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element = {<Principal/>}  />
        <Route path= "/login" element = "show login"/>
        <Route path= "/register" element = {<Registro/>}/>
        <Route path= "/contacts" element = "show contact grid"/>
        <Route path= "/contact/:id" element = "edit contact"/>
        <Route path= "/contact/create" element = "create contact"/>
        <Route path= "/alerts" element = "show alerts configuration"/>
        <Route path= "/profile" element = "show profile configuration"/>
      </Routes>
    </BrowserRouter>
)
}

export default App
