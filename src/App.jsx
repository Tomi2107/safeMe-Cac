
import { useState } from 'react'
import './App.css'
import { AuthProvider } from './context/authContext'
import {Registro} from './components/Registro'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Principal } from "./components/Principal"
import { Create } from "./components/Create"
import { Contactos } from "./components/Contactos"
import {Login} from "./components/Login"



function App() {
  const [count, setCount] = useState(0)


return (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path= "/" element = {<Principal/>}  />
        <Route path= "/login" element = {<Login/>}/>
        <Route path= "/register" element = {<Registro/>}/>
        <Route path= "/contacts" element = {<Contactos/>}/>
        <Route path= "/contact/:id" element = "edit contact"/>
        <Route path= "/create" element = {<Create/>}/>
        <Route path= "/alerts" element = "show alerts configuration"/>
        <Route path= "/profile" element = "show profile configuration"/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
)

}

export default App
