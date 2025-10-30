import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import { ROUTES } from './const/routes';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Publicaciones from './Pages/Publicaciones';
import Partidos from './Pages/Partidos';
import Reglamentos from './Pages/Reglamentos';
import Galeria from './Pages/Galeria';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Perfil from "./Pages/Perfil";
import PruebaRolProfe from "./Pages/PruebaRolProfe";
import PruebaRolJugador from "./Pages/PruebaRolJugador";
import Usuarios from "./Pages/Usuarios";
import Convocatoria from './Pages/Convocatoria';
import './App.css'
import RutaProtegida from './components/RutaProtegida';
import { ToastContainer } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path={ROUTES.register} element={<Register />} />
          <Route path={ROUTES.login} element={<Login />} /> 
        </Route>
        <Route element={<MainLayout/>}> 
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.publicaciones} element={<Publicaciones />} />
        <Route path={ROUTES.partidos} element={<Partidos />} />
        <Route path={ROUTES.reglamentos} element={<Reglamentos />} />
        <Route path={ROUTES.galeria} element={<Galeria />} />
        < Route element={<RutaProtegida/>}> {/* todos los usuarios logueados */}
          <Route path={ROUTES.perfil} element={<Perfil/>} />
        </Route>
        <Route element={<RutaProtegida roles={['profesor']}/>} >  {/**rutas de prueba, a cambiar */}
          <Route path={ROUTES.resultados} element={<PruebaRolProfe/>} />
        </Route>
         <Route element={<RutaProtegida roles={['jugador']}/>} >  
          <Route path={ROUTES.misPartidos} element={<PruebaRolJugador/>} />
        </Route>
         <Route element={<RutaProtegida roles={['administrador']}/>} >  
          <Route path={ROUTES.usuarios} element={<Usuarios/>} />
          <Route path={ROUTES.convocatoria} element={<Convocatoria/>}/>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
    <ToastContainer/>
    </>
  )
}

export default App
