import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CartaPublicacion from "../components/CartaPublicacion";

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem('token')
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
        {publicaciones.length === 0 ? (
          <p>No hay publicaciones</p>
        ) : (
          publicaciones.map((pub) => (
            <CartaPublicacion key={pub.idpublicacion} publicacion={pub} />
          ))
        )}
        { user && (
          <button onClick={() => navigate("/crearPublicacion")}
          className="fixed bottom-4 right-4 bg-[#243E73] hover:bg-[#2b4c8e] text-white font-bold py-3 px-5 rounded-lg shadow-lg z-50">Nueva Publicacion</button>
        )}
      </div>
      
    </div>
  );
};

export default Publicaciones;