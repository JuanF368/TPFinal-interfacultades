import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import { ROUTES } from './const/routes';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Publicaciones from './Pages/Publicaciones';
import Partidos from './Pages/Partidos';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
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
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
