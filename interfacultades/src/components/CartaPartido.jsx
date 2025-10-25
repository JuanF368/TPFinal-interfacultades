import React from "react";

const CartaPartido = ({ partido, onEditar }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition relative bg-white">
            <div className="flex justify-between mb-2 text-gray-600">
                <span>{new Date(partido.fecha).toLocaleDateString()}</span>
                <span>{partido.hora}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{partido.disciplina.nombre}</h2>
            <div className="text-gray-900 mb-2">{partido.lugar}</div>

            <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                    <span className="block text-lg font-bold">{partido.equipo1.facultad.siglas}</span>
                    <span className="text-2xl font-extrabold">{partido.resequipo1 !== null ? partido.resequipo1 : '-'}</span>
                </div>
                <span className="text-gray-500">vs</span>
                <div className="text-center">
                    <span className="block text-lg font-bold">{partido.equipo2.facultad.siglas}</span>
                    <span className="text-2xl font-extrabold">{partido.resequipo2 !== null ? partido.resequipo2 : '-'}</span>
                </div>
            </div>

            <button
                onClick={() => onEditar(partido)}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 cursor-pointer"
            >
                Actualizar resultados
            </button>
        </div>
    )
}

export default CartaPartido;