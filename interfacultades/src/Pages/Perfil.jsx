import React, { useState, useEffect } from "react";
import {usuarioActual} from "../utils/auth";
import CartaPublicacion from "../components/CartaPublicacion";

const Perfil = () => {
  const [seccion, setSeccion] = useState("perfil");
  const [publicaciones, setPublicaciones] = useState([]);
  const usuario = usuarioActual();

  useEffect(() => {
    if (seccion === "publicaciones") {
      obtenerPublicaciones();
    }
  }, [seccion]);

  const obtenerPublicaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/perfil/publicaciones", {
      headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPublicaciones(data);
    } catch (err) {
      console.error("Error al obtener publicaciones", err);
    }
  };

  return (
    <div className="p-4 text-left">
      <div className="flex font-bold space-x-4 text-gray-400 border-b-2 border-gray-300 mb-3">
        <button onClick={() => {setSeccion("perfil")}}
          className={`${seccion === "perfil" ? "font-bold text-[#E94D1A] border-b-2" : ""}`}>Perfil
        </button>
        <button onClick={() => {setSeccion("publicaciones")}}
          className={`${seccion === "publicaciones" ? "font-bold  text-[#E94D1A] border-b-2" : ""}`}> Mis publicaciones
        </button>
      </div>

      <div>
        {seccion === "perfil" && (
          <div>
            <h2 className="text-xl font-semibold">Perfil</h2>
          </div>
        )}

        {seccion === "publicaciones" && (
          <div>
            {publicaciones.length === 0 ? (
              <p>No hay publicaciones</p>
            ) : (
              publicaciones.map((publi) => (
                <CartaPublicacion key={publi.idpublicacion} publicacion={publi} cambio={obtenerPublicaciones}/>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
