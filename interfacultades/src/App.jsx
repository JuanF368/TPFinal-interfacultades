import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import { ROUTES } from './const/routes';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.register} element={<Register />} />

         <Route path={ROUTES.login} element={<Login />} /> 
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
