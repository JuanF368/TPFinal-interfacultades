import React from "react";

const CartaFacultad = ({ titulo, imagen, descripcion }) => {
  const placeholder = "https://assets.turbologo.com/blog/en/2019/05/19085137/no-logo.png";

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 min-w-[260px] max-w-[280px]">
      <div className="h-30 w-full flex items-center justify-center overflow-hidden">
        <img
          src={imagen || placeholder}
          alt={titulo}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 text-left">{titulo}</h3>
        <p className="text-left">{descripcion}</p>
      </div>
    </div>
  );
};

export default CartaFacultad;
