import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 container mx-auto px-4 py-6'>
        {mensaje && (
          <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow transition-opacity duration-300">
            {mensaje}
          </div>
        )}
        <h1 className="text-4xl font-bold">Página Principal</h1>
        <p className="mt-4 text-lg">Esta es la página principal de nuestra aplicación.</p>
      </main>
      <Footer />
    </div>
  );
}
export default Home;