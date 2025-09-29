import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import Header from '../components/Header';

const Home = () => {
  const location = useLocation();
  const [mensaje, setMensaje] = useState(''); 
  useEffect(() => {
    if (location.state?.mensaje) {
      setMensaje(location.state.mensaje);
      const timer = setTimeout(() => {
        setMensaje('');
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div>
      <Header />
      {mensaje && (
        <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow transition-opacity duration-300">
          {mensaje}
        </div>
      )}
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4 text-lg">This is the home page of our application.</p>
    </div>
  );
}
export default Home;