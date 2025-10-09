import React from "react";

const CartaPublicacion = ({ publicacion }) => {
  const { titulo, contenido, nombreUsuario, fecha, imagenes } = publicacion;
  return (
    <div className="m-1.5">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{titulo}</h2>
      <p className="text-sm text-gray-400 mb-2">{nombreUsuario} - {new Date(fecha).toLocaleString()}</p>
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
      <hr className="m-4 border border-[#ddd]"/>
    </div>
  );
};

export default CartaPublicacion;
