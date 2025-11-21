import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowDroprightCircle, IoIosArrowDropleft } from "react-icons/io"; 
import { motion, AnimatePresence } from "motion/react";
import { FaQuoteLeft } from "react-icons/fa";

const SeccionPublicaciones = () => {
    
    const [publicaciones, setPublicaciones] = useState([]); 
    const [index, setIndex] = useState(0); 
    const navigate = useNavigate();
    
  useEffect(()=>{
    const fetchPulis = async() => { 
      try { 
        const res= await fetch('http://localhost:3001/publicaciones');
        const data = await res.json(); 
        // imgs
        const publicacion = data.map(publi=>({
            ...publi,
            imagenes: publi.imagenes?.map(img => ({
                ...img,
                url: `http://localhost:3001${img.url}`,
            })) ?? [],
        }))
        setPublicaciones(publicacion); 
      } catch(error) { 
        console.log('Error al obtener publicaciones: ', error); 
      }
    }; 
    fetchPulis();
    }, []); 

    const next = () => {
        if (index < publicaciones.length - 1) {
        setIndex(index + 1);
        }
    };
    const prev = () => {
        if (index > 0) {
        setIndex(index - 1);
        }
    };
    const handleVerMas = () => {
        navigate("/publicaciones");
    };

    const publi = publicaciones[index];

    return (
        <div className='w-full py-5 px-2 md:px-5 flex flex-col items-center'> 
           <AnimatePresence mode="wait" > 
            {publi ? ( 
                <motion.div key={publi.idpublicacion ?? index} initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.3 }}
                className='relative p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl' > 
                    <div className='absolute top-4 right-4 flex gap-2 z-20'> 
                        <button onClick={prev} disabled={ index === 0}
                        className={`transition ${index === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}`} >
                            <IoIosArrowDropleft size={30} color="#E94D1A"/>
                        </button>
                        <button onClick={next} disabled= {index === publicaciones.length - 1}
                         className={`transition ${index === publicaciones.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}`} > 
                            <IoIosArrowDroprightCircle size={30} color="#E94D1A"/>
                        </button>
                    </div>
                     <div className='w-full md:w-1/3 flex-shrink-0'>
                        {publi.imagenes?.length > 0 ? (
                            <img src={publi.imagenes[0].url || "https://interfacultades.uncoma.edu.ar/wp-content/uploads/2025/08/Mascota-.png"} alt="imagen publicacion"
                            className='w-full h-64 md:h-72 object-cover rounded-xl'/>
                        ) : ( 
                            <img src={"https://interfacultades.uncoma.edu.ar/wp-content/uploads/2025/08/Mascota-.png"} alt="imagen publicacion"
                            className='w-full h-64 md:h-72 object-cover rounded-xl'/>
                        )}
                    </div>
                    
                    <div className='flex-1 text-left md:text-left px-2 md:px-6'> 
                        <FaQuoteLeft size={25} color="#E94D1A" />
                        <h2 className='text-[#243E73] font-bold text-3xl '> {publi.titulo}</h2>
                        <p className='text-gray-700 text-lg mb-4'> {publi.contenido}</p>
                        <div className='flex items-center gap-3 justify-center md:justify-start mt-2'>
                            <div > 
                                <p className='font-semibold text-[#243E73]'>{publi.nombreUsuario}</p>
                                <p className='text-gray-500 text-sm'> {new Date(publi.fecha).toLocaleDateString("es-AR")}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) :  ( 
                <h2 className='text-gray-500'> Sin publicaciones </h2>
            )}
           </AnimatePresence>
           {index === publicaciones.length - 1 && publicaciones.length > 0 && ( 
            <button onClick={handleVerMas} className='mt-4 bg-[#E94D1A] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[#c23c0f] cursor-pointer'> Ver mas publicaciones </button>
           )}
        </div>
        
    );
}

export default SeccionPublicaciones; 