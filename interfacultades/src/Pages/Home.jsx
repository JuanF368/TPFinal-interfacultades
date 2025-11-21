import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from "motion/react";
import CartaCostado from '../components/CartaCostado';
import CartaDisciplina from '../components/CartaDisciplina';
import CartaFacultad from '../components/CartaFacultad';
import SeccionPublicaciones from '../components/SeccionPublicaciones';

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
  const [disciplinas, setDisciplinas] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [partidos, setPartidos] = useState([]); 
  const navigate = useNavigate();

   useEffect(() => {
    const fetchData = async () => {
      try {
        const [discRes, facRes] = await Promise.all([
          fetch("http://localhost:3001/disciplina"),
          fetch("http://localhost:3001/facultades"),
        ]);

        const [discData, facData] = await Promise.all([
          discRes.json(),
          facRes.json(),
        ]);

        setDisciplinas(discData);
        setFacultades(facData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    const fetchPartidos = async () => {
      try { 
        const response = await fetch("http://localhost:3001/partidos"); 
        const data = await response.json(); 
        setPartidos(data); 
      } catch(error){
        console.error("Error al obtener los partidos:", error);
      }
    }; 
    fetchPartidos(); 
  }, []);

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
              <a className='bg-[#E94D1A] hover:bg-[#c23c0f] text-white font-semibold px-6 py-3 rounded-xl shadow-lg' href='#disciplinas'>
                Ver deportes
              </a>
              <a className='bg-white/80 hover:bg-white text-[#243E73] font-semibold px-6 py-3 rounded-xl shadow-lg' href='#facultades'> 
                Facultades que participan
              </a>
            </div>
          </div>
      </section>
      <section className='w-full px-6 md:px-10 py-10 flex flex-col lg:flex-row gap-8'> 
        <div className='flex-1 flex flex-col gap-8'> 
          <section id="galeria" > 
            <p> galeria </p>
          </section>
          <section id="disciplinas" className='py-6 overflow-hidden relative w-full'> 
            <h2 className='text-3xl font-bold text-[#243E73] text-center mb-6'> Disciplinas </h2>
            <div className='overflow-hidden w-full h-[280px] relative'> 
                <motion.div className='flex gap-6 absolute top-0 left-0'
                animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear"}} whileHover={{ animationPlayState: "paused" }}> 
                  {[...disciplinas, ...disciplinas].map((disc, i) => (
                    <CartaDisciplina key={`${disc.iddisciplina}-${i}`} titulo={disc.nombre} imagen={disc.imagen} reglamento={disc.reglamento} tipo={disc.tipo} />
                  ))}
                </motion.div>
            </div>
          </section>
          <section id="partidos" className='text-white py-10 px-6 md:px-12 bg-[#1E293B] rounded-2xl' > 
            <h2 className='text-3xl font-bold text-white text-center mb-8'> Proximos Partidos</h2>
            <div className='space-y-8 max-w-5xl mx-auto'> 
              {partidos.length > 0 && (
                <div className='text-center mb-10'>
                  <h3 className='text-2xl md:text-3xl font-semibold mt-2'>
                    ¡No te pierdas los proximos encuentros!
                  </h3>
                </div>
              )}
              { partidos.length > 0 ? (
                partidos.map((partido) => (
                  <div key={partido.idpartido} className='flex flex-col md:flex-row items-center overflow-hidden '> 
                    <div className='flex flex-col justify-between md:w-1/3 px-4 py-5 '>
                      <div className='bg-[#E94D1A] rounded-full px-4 py-1 inline-block self-start'>
                        <p className='text-[#1E293B] font-bold'>
                          {new Date(partido.fecha).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <p className='text-sm text-right text-gray-200 mt-2 mr-10'>
                        {partido.lugar}
                      </p>
                    </div>

                    <div className='w-full md:w-1/3'> 
                      <img src={ partido.disciplina.imagen} alt={partido.disciplina.nombre} className='w-full h-40 object-cover rounded-3xl' />
                    </div>

                    <div className='flex flex-col justify-center p-6 md:w-1/2'>
                      <h3 className='text-2xl font-bold text-white'>
                        {partido.disciplina.nombre}
                      </h3>
                      <p className='text-gray-300 mt-2'>
                        <strong>{partido.facultad1.siglas}</strong> vs 
                        <strong> {partido.facultad2.siglas}</strong>
                      </p>

                      <div className='flex items-center gap-6 mt-4 text-sm text-gray-300'>
                        <div>
                          <p className='font-semibold'>Hora:</p>
                          <p><strong> {partido.hora?.slice(0, 5)}</strong></p>
                        </div>
                        <div>
                          <p className='font-semibold'>Estado:</p>
                          <p className='capitalize'><strong>{partido.estado} </strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))
                  ) : ( 
                    <h2 className='text-center'> No hay partidos cerca </h2>
                  )}
            </div>

            <div className='flex justify-end'>
            <button onClick={() => navigate("/partidos")} className='bg-[#E94D1A] hover:bg-[#c23c0f] text-white font-semibold px-6 py-3 rounded-full cursor-pointer'>
              Ver todos los partidos
            </button>
          </div>
          </section>
          <section id="facultades" className='py-6 overflow-hidden relative w-full '> 
            <h2 className='text-3xl font-bold text-[#243E73] text-center mb-6'> Participantes </h2>
            <div className='overflow-hidden  w-full  h-[280px] relative'> 
              <motion.div className='flex gap-6 absolute top-0 left-0'
               animate={{ x: ["-50%", "0%"] }} transition={{ duration: 42, repeat: Infinity, ease: "linear"}} whileHover={{ animationPlayState: "paused" }}> 
                {[...facultades, ...facultades].map((fac, i) => (
                  <CartaFacultad key={`${fac.idfacultad}-${i}`} titulo={fac.siglas} descripcion={fac.nombre} imagen={fac.logo} />
                ))}
              </motion.div>
            </div>
          </section>
          <section id="publicaciones" className='py-6 overflow-hidden relative w-full' > 
            <h2 className='text-3xl font-bold text-[#243E73] text-left'> Ultimas publicaciones </h2>
            <SeccionPublicaciones />
          </section>
        </div>
        <aside className="w-full lg:w-80 lg:sticky lg:top-10 self-start h-fit">
          <CartaCostado />
        </aside>
      </section>

      <div className='bg-white py-8 shadow-inner mt-16'> 
        <h2 className="text-center text-gray-800 text-xl font-semibold mb-6"> Colaboradores que nos acompañan</h2>
        <div className='overflow-hidden'> 
          <motion.div initial={{x:0}} animate={{ x: "-100%"}} transition={{ duration:15, repeat:Infinity, ease:"linear" }} className='flex flex-shrink-0' > 
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