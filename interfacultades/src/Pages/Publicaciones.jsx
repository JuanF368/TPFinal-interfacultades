import React, { useEffect, useState } from "react";
import CartaPublicacion from "../components/CartaPublicacion";
import PublicacionForm from "../components/PublicacionForm";

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const user = localStorage.getItem('token')
  const [nuevo, setNuevo] = useState(false);
  const obtenerPublicaciones = async () => {
    try {
      const res = await fetch("http://localhost:3001/publicaciones");
      const data = await res.json();

      if (Array.isArray(data)) {
        setPublicaciones(data);
      } else {
        console.error("Error:", data);
        setPublicaciones([]);
      }
    } catch (err) {
      console.error("Error en las publicaciones", err);
    }
  };

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  return (
    <div className="w-full px-4 py-6 text-left">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Publicaciones</h1>
      <div className="w-full mx-auto bg-blue-50 p-6 rounded-2xl ">
        <h1 className="font-bold mb-4">Publicaciones</h1>
        <hr className="mb-6"/>
       {nuevo ? (
          <PublicacionForm modo="crear" exito={() => {setNuevo(false);
          obtenerPublicaciones();}} />
        ) : (
          publicaciones.length === 0 ? (
            <p>No hay publicaciones</p>
          ) : (
            publicaciones.map((pub) => (
              <CartaPublicacion key={pub.idpublicacion} publicacion={pub} />
            ))
          )
        )}
        { user && !nuevo && (
        <button onClick={() => setNuevo(true)}
          className="fixed bottom-6 right-6 bg-[#E94D1A] text-white px-5 py-3 rounded-md shadow-lg hover:bg-[#c03d12] ">
          Nueva Publicacion </button>
      )}
      </div>
      
    </div>
  );
};

export default Publicaciones;