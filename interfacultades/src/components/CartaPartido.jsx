import React from "react";
import { usuarioActual, isAuthenticated } from "../utils/auth";

const CartaPartido = ({ partido, onEditar, cambiarEstado }) => {
    const user = usuarioActual();
    console.log(user);
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition relative bg-white">
            <div className="flex justify-between mb-2 text-gray-600">
                <span>{new Date(partido.fecha).toLocaleDateString()}</span>
                <span className={`text-sm font-medium ${
                    partido.estado === "pendiente" ? "text-gray-500" :
                    partido.estado === "en_curso" ? "text-blue-600" : "text-green-600"
                }`}>
                    {partido.estado === "pendiente" && "Pendiente"}
                    {partido.estado === "en_curso" && "En Curso"}
                    {partido.estado === "finalizado" && "Finalizado"}
                </span>
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
            {user?.rodescripcion === "profesor" && partido.estado === "en_curso" && (
                <button
                    onClick={() => onEditar(partido)}
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 cursor-pointer"
                >
                    Actualizar resultados
                </button>
            )}
            {user?.rodescripcion === "profesor" && partido.estado !== "finalizado" && (
                <button
                    onClick={() => cambiarEstado(partido)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer ml-2"
                >
                    {partido.estado === "pendiente" && "Iniciar Partido"}
                    {partido.estado === "en_curso" && "Finalizar Partido"}
                </button>
            )}
            
        </div>
    )
}

export default CartaPartido;