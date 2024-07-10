import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Principal} from "./components/Principal.jsx"
import { Login } from "./components/Login"
import { Registro } from './components/Registro'
import { Contactos } from "./components/Contactos"
import { Create } from "./components/Create"
import { Perfil } from './components/Perfil.jsx'
import { Edit } from "./components/Edit.jsx"
import { Alerts} from "./components/Alerts.jsx"

import { AuthProvider } from './context/authContext'

function App() {

return (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path= "/" element = {<Principal/>}  />
        <Route path= "/login" element = {<Login/>}/>
        <Route path= "/register" element = {<Registro/>}/>
        <Route path= "/contacts" element = {<Contactos/>}/>
        <Route path= "/edit/:id" element = {<Edit/>}/>
        <Route path= "/create" element = {<Create/>}/>
        <Route path= "/alerts" element = {<Alerts/>}/>
        <Route path= "/profile" element = {<Perfil/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
)
}

export default App

