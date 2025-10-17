import React, { useEffect, useState } from "react";
import CartaPublicacion from "../components/CartaPublicacion";
import PublicacionForm from "../components/PublicacionForm";
import { toast } from "react-toastify";

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const user = localStorage.getItem('token')
  const [nuevo, setNuevo] = useState(false);
  const [estaEditando, setEstaEditando] = useState(false);

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
      <div className="flex flex-col lg:flex-row gap-6"> 
        <div className="flex-1 bg-blue-50 p-6 rounded-2xl ">
        <h1 className="font-bold mb-4">Publicaciones</h1>
        <hr className="mb-6"/>
       {nuevo ? (
          <PublicacionForm modo="crear" exito={() => {setNuevo(false);
          toast.success("Publicacion creada con exito!");
          obtenerPublicaciones();}} setNuevo={setNuevo} />
        ) : (
          publicaciones.length === 0 ? (
            <p>No hay publicaciones</p>
          ) : (
            !estaEditando && publicaciones.map((pub) => (
              <CartaPublicacion key={pub.idpublicacion} publicacion={pub} cambio={obtenerPublicaciones} setEstaEditando={setEstaEditando}/>
            ))
          )
        )}
        { user && !nuevo && (
        <button onClick={() => setNuevo(true)}
          className="fixed bottom-6 right-6 bg-[#E94D1A] text-white px-5 py-3 rounded-md shadow-lg hover:bg-[#c03d12] cursor-pointer">
          Nueva Publicacion </button>
      )}
      </div>
      <div className="w-full lg:w-96 bg-gray-100 p-6 rounded-2xl"> 
        <h2  className="font-bold mb-4"> Espacio para futuras cosas (ej:tops - filtrado)</h2>
      </div>
    </div>
    </div>
  );
};

export default Publicaciones;