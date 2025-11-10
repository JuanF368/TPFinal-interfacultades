import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from "motion/react";

const Home = () => {
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

  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:3001/facultades/ranking');
        const data = await response.json();
        setRanking(data);
      } catch (error) {
        console.error('Error al obtener el ranking de facultades:', error);
      }
    };
    fetchRanking();
    const interval = setInterval(fetchRanking, 10000); // Actualiza cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col min-h-screen mx-auto'>
      <main className='flex-1 container mx-auto px-4 py-6 flex gap-8'>
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Página Principal</h1>
          <p className="mt-4 text-lg">
            Esta es la página principal de nuestra aplicación.
          </p>
        </div>
        <aside className='w-full lg:w-80 bg-[#1E293B] text-white border border-white/10 rounded-2xl shadow-xl p-6'>
          <h2 className='text-2xl font-semibold text-[#E94D1A] mb-6 text-center'>
            Ranking de Facultades
          </h2>
          {ranking.length > 0 ? (
            <ul className='space-y-3'>
              {ranking.map((facultad, index) => (
                <li key={facultad.idfacultad} className='flex justify-between items-center bg-[#0F172A] rounded-lg px-4 py-3 hover:bg-[#243E73]/40 transition-all duration-200 shadow-sm'>
                  <div className='flex items-center gap-3'>
                    <span className='text-lg font-bold text-[#E94D1A]'>{index + 1}</span>
                    <span className='font-medium text-gray-100'>{facultad.siglas}</span>
                  </div>
                  <span className='text-sm font-semibold text-blue-400'>
                    {facultad.puntos ?? 0} pts
                  </span>
                </li>
              ))}
            </ul>
          ):(
            <p className='text-gray-400 text-center text-sm italic'>
              Cargando ranking...
            </p>
          )}
        </aside>
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