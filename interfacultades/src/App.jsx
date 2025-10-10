import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import { ROUTES } from './const/routes';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Publicaciones from './Pages/Publicaciones';
import Partidos from './Pages/Partidos';
import Reglamentos from './Pages/Reglamentos';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import PublicacionForm from "./components/PublicacionForm";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
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
        <Route path={ROUTES.crearPublicacion} element={<PublicacionForm />} />
        <Route path={ROUTES.reglamentos} element={<Reglamentos />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
