import React, { useState } from "react";
import { BiMessageAltEdit } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { usuarioActual } from "../utils/auth";
import PublicacionForm from "./PublicacionForm"; 
import CartelConfirmacion from "./CartelConfirmacion";
import { toast } from "react-toastify";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const CartaPublicacion = ({ publicacion, cambio}) => {
  const usuario = usuarioActual();
  const esDuenio = usuario && usuario.idusuario === publicacion.idusuario;
  const [editando, setEditando] = useState(false); 
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false); 
  const { titulo, contenido, nombreUsuario, fecha, imagenes } = publicacion;

  const eliminarPublicacion = async() => {
     try { 
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3001/perfil/publicaciones/${publicacion.idpublicacion}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Publicacion eliminada con exito!"); 
      setMostrarConfirmacion(false); 
      if(cambio){
        cambio();
      }
    } catch (err){ 
      console.error("Error al eliminar", err);
      toast.error("Error al eliminar la publicacion!");
    }
  }
  const exito = async() => {
    setEditando(false); 
    toast.success("Publicacion editada con exito!");
    if (cambio) {
      cambio();
    }
  }
  const itemsGaleria = imagenes.map((img) => ({
    original: `http://localhost:3001${img.url}`,
    thumbnail: `http://localhost:3001${img.url}`,
  })) || [];

  if(editando){
    return(
      <div className="m-4"> 
        <PublicacionForm modo="editar" publicacion={publicacion} exito={exito} setNuevo={setEditando} />
      </div>
    );
  }

  return (
    <div className="m-1.5 relative cursor-default">
      <div className="bg-[#305aad] text-white mb-2"> 
        {esDuenio && (
          <div className="absolute top-3 right-3 flex gap-2 cursor-pointer mb-3">
            <BiMessageAltEdit size={28} color="#fd6533" onClick={() => setEditando(true)}/>
            <FaRegTrashAlt size={24} color="#fd6533"onClick={() => setMostrarConfirmacion(true)}/>
          </div>
        )}
      <h2 className="text-lg sm:text-xl font-semibold text-left m-1.5 p-2">{titulo}</h2>
      </div>
        {itemsGaleria.length > 0 && (
          <div className="mb-3" > 
            <div className="m-auto w-full flex justify-start">
              <div className="w-full sm:w-[90%] lg:w-[70%]">
                <ImageGallery items={itemsGaleria} showNav={false} autoPlay={true} showBullets={true} showPlayButton={false} showThumbnails={window.innerWidth >= 640} showFullscreenButton={false} thumbnailPosition="left"
                  renderItem={(item) => ( 
                  <div className="w-full flex justify-center items-center rounded-xl
                  overflow-hidden h-[400px] sm:h-[500px] lg:h-[350px]">
                    <img src={item.original} alt={item.originalAlt} className="object-contain w-full h-full"/>
                  </div>
                  )}
                  renderThumbInner={(item) => ( 
                    <div className="flex justify-center items-center w-full h-full">
                      <img src={item.thumbnail} alt={item.thumbnailAlt} className="rounded-md object-cover
                      w-20 h-20 sm:w-24 sm:h-24 lg:w-16 lg:h-16"/>
                    </div>
                )}/>
              </div>
            </div>
          </div>
        )}
      <div className="break-words overflow-hidden"> 
      <p className="text-sm text-gray-400 mb-2">{nombreUsuario} - {new Date(fecha).toLocaleDateString()}</p>
      <p className="text-gray-800 mb-2 whitespace-pre-line leading-relaxed">{contenido}</p>
      </div>
      {mostrarConfirmacion && (
        <CartelConfirmacion mensaje="Seguro de querer eliminar la publicacion?" confirmar={eliminarPublicacion} cancelar={() => setMostrarConfirmacion(false)}/>
      )}
      <hr className="m-4 border border-[#ddd]"/>
    </div>
  );
};

export default CartaPublicacion;
