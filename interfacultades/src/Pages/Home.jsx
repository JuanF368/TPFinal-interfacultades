import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState(''); 
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.state?.mensaje) {
      setMensaje(location.state.mensaje);
      setVisible(true);

      const timerFade = setTimeout(() =>{
        setVisible(false);
      }, 4000);

      const timer = setTimeout(() => {
        setMensaje('');
        navigate(location.pathname, { replace: true });
      }, 5000); 
      return () => {
        clearTimeout(timer);
        clearTimeout(timerFade);
      };
    }
  }, [location, navigate]);

  return (
    <div className='flex flex-col min-h-screen'>
      {mensaje && (
          <div className={`mb-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {mensaje}
          </div>
        )}
      <main className='flex-1 container mx-auto px-4 py-6'>
        <h1 className="text-4xl font-bold">Página Principal</h1>
        <p className="mt-4 text-lg">Esta es la página principal de nuestra aplicación.</p>
      </main>
    </div>
  );
}
export default Home;