import React from "react";
import { BiMessageAltEdit } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';

const CartaPublicacion = ({ publicacion, editar, eliminar }) => {
  const { titulo, contenido, nombreUsuario, fecha, imagenes } = publicacion;
  return (
    <div className="m-1.5 relative">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{titulo}</h2>
      <p className="text-sm text-gray-400 mb-2">{nombreUsuario} - {new Date(fecha).toLocaleDateString()}</p>
      <p className="text-gray-800 mb-2 whitespace-pre-line">{contenido}</p>

      {imagenes && imagenes.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {imagenes.map((imgUrl, index) => (
            <img
              key={index}
              src={`http://localhost:3001${imgUrl}`}
              alt={`img-${index}`}
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-md flex-shrink-0"
            />
          ))}
        </div>
      )}

      {(editar || eliminar ) && (
         <div className="absolute top-3 right-3 flex gap-2">
          {editar && (<BiMessageAltEdit size={28} color="#E94D1A" onClick={editar}/>)}
          {eliminar && (<FaRegTrashAlt size={24} color="#E94D1A"onClick={eliminar}/>)}
        </div>
      )}
      <hr className="m-4 border border-[#ddd]"/>
    </div>
  );
};

export default CartaPublicacion;
