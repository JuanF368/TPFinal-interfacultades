import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from "motion/react";
import CartaCostado from '../components/CartaCostado';

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

  return (
    <div className='flex flex-col min-h-screen mx-auto '>
      <section className='w-full relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl'> 
          <img  src="/fondoHome.jpeg" alt="Interfacultades" className='object-cover w-full h-full brightness-75'/>
          <div className='absolute inset-0 flex flex-col justify-center items-start text-white text-left px-10 md:px-20'>
            <h1 className='text-5xl md:text-6xl font-bold mb-3 drop-shadow-lg'>Interfacultades UNCO</h1>
            <p className='text-lg max-w-xl drop-shadow-md mb-6'>
              Esta es la página principal de nuestra aplicación.
            </p>
            <div className='flex gap-4'> 
              <a className='bg-[#E94D1A] hover:bg-[#c23c0f] text-white font-semibold px-6 py-3 rounded-xl shadow-lg' href='#deportes'>
                Ver deportes
              </a>
              <a className='bg-white/80 hover:bg-white text-[#243E73] font-semibold px-6 py-3 rounded-xl shadow-lg' href='#facultades'> 
                Facultades que participan
              </a>
            </div>
          </div>
      </section>
      <section className='container mx-auto px-0 py-10 flex flex-col lg:flex-row gap-8'> 
        <div className='flex-1 flex flex-col gap-8'> 
          <section id="galeria" > 
            <p> galeria </p>
          </section>
          <section id="deportes" > 
            <p> deportes </p>
          </section>
          <section id="facultades" > 
            <p> facultades </p>
          </section>
          <section id="publicaciones" > 
            <p> publicaciones </p>
          </section>
        </div>
        <aside className="w-full lg:w-80 lg:sticky lg:top-10 self-start h-fit">
          <CartaCostado />
        </aside>
      </section>

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