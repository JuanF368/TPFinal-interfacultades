import React, {useEffect, useState} from 'react';
import socket from '../utils/socket';

const CartaCostado = () => {

  const [ranking, setRanking] = useState([]);
  const [convocatoria, setConvocatoria] = useState(null);
  const [estado, setEstado] = useState(null);

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

    socket.on('actualizarRanking', fetchRanking);

    return () => {
      socket.off('actualizarRanking', fetchRanking);
    };
  }, []);

  useEffect(()=>{ 
    const fetchConvocatoria = async () => {
      try { 
        const response = await fetch("http://localhost:3001/convocatoria/estado"); 
        const data = await response.json(); 
        setConvocatoria(data.convocatoria); 
        setEstado(data.estado); 
      } catch(error){
        console.error("Error al obtener la convocatoria:", error);
      }
    }; 
    fetchConvocatoria(); 
  }, []); 
 

  return (
    <>
        {convocatoria ? (
                <div className='backdrop-blur-md bg-white/50 rounded-2xl shadow-xl px-6 py-4 text-gray-900 border border-white/30  mb-3.5 mt-10'> 
                  <h2 className='text-2xl font-bold mb-2 text-[#243E73]'>Convocatoria</h2>
                  <hr className='border-white/50 mb-3'/>
                  <p className='text-base capitalize mb-4'>
                    Estado: <span className='font-bold text-[#E94D1A]'>{estado}</span>
                  </p>
                  <div className='space-y-2 text-sm'> 
                    <div className='flex justify-between'>
                      <span className='font-medium text-gray-700'>Unidades:</span>
                      <span>{new Date(convocatoria.inicioUnidades).toLocaleDateString()}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium text-gray-700'>Inscripción:</span>
                      <span>{new Date(convocatoria.inicioInscripcion).toLocaleDateString()}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium text-gray-700'>Juegos:</span>
                      <span>{new Date(convocatoria.inicioJuegos).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
            ) : (
              <p>No hay convocatoria abierta</p>
            )}
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
    </>
   
    )
}

export default CartaCostado; 