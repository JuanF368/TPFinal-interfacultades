import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from "motion/react";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState(''); 
  const [visible, setVisible] = useState(false);
  const upper = [ 
    "/logos/colaboradores/club.png", 
    "/logos/colaboradores/iseiIns.png", 
    "/logos/colaboradores/lauraus.png",
    "/logos/colaboradores/muniCipo.png",
    "/logos/colaboradores/rioNegro.png",
    "/logos/colaboradores/zapala.png",
    "/logos/colaboradores/neuquen.png",
    "/logos/colaboradores/provincia.jpg",
    "/logos/colaboradores/vistaa.png"
  ]

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
    <div className='flex flex-col min-h-screen mx-auto'>
      {mensaje && (
          <div className={`mb-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {mensaje}
          </div>
        )}
      <main className='flex-1 container mx-auto px-4 py-6'>
        <h1 className="text-4xl font-bold">Página Principal</h1>
        <p className="mt-4 text-lg">Esta es la página principal de nuestra aplicación.</p>
      </main>

      <div className='bg-white py-8 shadow-inner mt-16'> 
        <h2 className="text-center text-gray-800 text-xl font-semibold mb-6"> Colaboradores que nos acompañan</h2>
        <div className='overflow-hidden'> 
          <motion.div initial={{x:0}} animate={{ x: "-100%"}} transition={{ duration:30, repeat:Infinity, ease:"linear" }} className='flex flex-shrink-0' > 
            {[...upper, ...upper].map((image, index) => {
              return <img className="h-14 object-contain mx-10" src={image} key={index}  alt={`colaborador-${index}`}/>;
            })}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
export default Home;