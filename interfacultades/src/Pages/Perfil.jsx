import React, { useState, useEffect } from "react";
import {usuarioActual} from "../utils/auth";
import CartaPublicacion from "../components/CartaPublicacion";
import { toast } from "react-toastify";

const Perfil = () => {
  const [seccion, setSeccion] = useState("perfil");
  const [publicaciones, setPublicaciones] = useState([]);
  const usuario = usuarioActual();
  const [datosUsuario, setDatosUsuario] = useState({ usnombre: "", usapellido:"", usmail:"", rol:""});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (seccion === "publicaciones") {
      obtenerPublicaciones();
    } else if(seccion === "perfil"){
      obtenerDatosPerfil(); 
    }
  }, [seccion]);

  const obtenerDatosPerfil = async() =>{
    try{
      const res = await fetch("http://localhost:3001/perfil", {
        headers: {Authorization: `Bearer ${token}` },
      }); 
      const data = await res.json();
      setDatosUsuario(data);
    } catch(error){
      console.error("Error al buscar perfil; ", error); 
    }
  }

  const handleChange = (e) => {
    setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value });
  };

    
   const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/perfil/editar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosUsuario),
      });
      const data = await res.json();
      toast.success(data.mensaje);
    } catch (error) {
      console.error("Error al guardar perfil", error);
      toast.error(data.error);
    }
  };

  const obtenerPublicaciones = async () => {
    try {
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
      <div className="flex font-bold space-x-4 text-gray-400 border-b-4 border-gray-300 mb-3">
        <button onClick={() => {setSeccion("perfil")}}
          className={`${seccion === "perfil" ? "font-bold text-[#E94D1A] border-b-2" : ""}`}>Perfil
        </button>
        <button onClick={() => {setSeccion("publicaciones")}}
          className={`${seccion === "publicaciones" ? "font-bold  text-[#E94D1A] border-b-2" : ""}`}> Mis publicaciones
        </button>
      </div>

      <div>
        {seccion === "perfil" && (
          <div className="max-w-2xl mx-auto bg-blue-50 shadow-md rounded-lg p-8 m-6">
            <h2 className="text-2xl font-semibold mb-6">Mi perfil</h2>
            <form onSubmit={handleGuardar} className="space-y-8"> 
              <div> 
                <h3 className="text-lg font-semibold text-gray-700"> Nombre </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-600 mb-1" >Nombre: </label>
                    <input type="text" name="usnombre" value={datosUsuario.usnombre || ""} onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded "/>
                </div>
                  <div > 
                    <label className="block text-sm font-medium text-gray-600 mb-1" >Apellido: </label>
                    <input type="text" name="usapellido" value={datosUsuario.usapellido || ""} onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded "/>
                  </div> 
                </div>
              </div>
              <div> 
                <h3 className="text-lg font-semibold text-gray-700 mb-3"> Datos de usuario </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                  <div> 
                  <label className="block text-sm font-medium text-gray-600 mb-1" >Rol: </label>
                  <input type="text" name="idrol" readOnly  value={datosUsuario.rol || ""} onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded"/>
                </div>
                <div> 
                  <label className="block text-sm font-medium text-gray-600 mb-1" >Email: </label>
                  <input type="text" name="usmail" value={datosUsuario.usmail || ""} onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded "/>
                </div> 
                <div> 
                  <label className="block text-sm font-medium text-gray-600 mb-1" >Nueva contraseña: </label>
                  <input type="text" name="uspass" onChange={handleChange}
                  className="border border-gray-300 p-2 w-full rounded "/>
                </div>
                </div>
                
              </div>
               
              <button type="submit"className="bg-[#E94D1A] text-white px-4 py-2 rounded mt-2 hover:bg-[#c83e14]">
              Guardar cambios </button>
            </form>
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
