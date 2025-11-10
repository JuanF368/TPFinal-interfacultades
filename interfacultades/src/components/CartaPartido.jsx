import React from "react";
import { usuarioActual } from "../utils/auth";
import { FaCalendarAlt, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

const CartaPartido = ({ partido, onEditar, cambiarEstado }) => {
    const user = usuarioActual();
    const fecha= new Date(`${partido.fecha}T00:00:00`);

    const estadoColor = {
        pendiente: "bg-amber-100 text-amber-600 border-amber-300",
        en_curso: "bg-rose-100 text-rose-700 border-rose-300",
        finalizado: "bg-emerald-100 text-emerald-700 border-emerald-300"
    }[partido.estado];

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all relative">
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaCalendarAlt size={16}/>
                    <span>{fecha.toLocaleDateString("es-AR")}</span>
                </div>
                <span
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${estadoColor}`}
                >
                    {partido.estado === "pendiente" && "Pendiente"}
                    {partido.estado === "en_curso" && (
                        <>
                            En curso
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                            </span>
                        </>
                    )}
                    {partido.estado === "finalizado" && "Finalizado"}
                </span>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaRegClock size={16}/>
                    <span>{partido.hora}</span>
                </div>
            </div>

            <div className="mb-3">
                <h2 className="text-xl font-bold text-gray-800">
                    {partido.disciplina.nombre}
                </h2>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <FaMapMarkerAlt size={16}/>
                    <span>{partido.lugar}</span>
                </div>
            </div>

            <div className="flex justify-between items-center my-5">
                <div className="text-center flex-1">
                    <span className="block text-lg font-semibold text-gray-800">
                        {partido.facultad1.siglas}
                    </span>
                    <span className="block text-3xl font-extrabold text-gray-900 mt-1">
                        {partido.resequipo1 ?? '-'}
                    </span>
                </div>

                <span className="mx-6 text-gray-400 font-bold text-lg">VS</span>

                <div className="text-center flex-1">
                    <span className="block text-lg font-semibold text-gray-800">
                        {partido.facultad2.siglas}
                    </span>
                    <span className="block text-3xl font-extrabold text-gray-900 mt-1">
                        {partido.resequipo2 ?? '-'}
                    </span>
                </div>
            </div>
            
            {user?.rodescripcion === "profesor" && (
                <div className="flex justify-end gap-2">
                    {partido.estado === "en_curso" && (
                        <button
                            onClick={() => onEditar(partido)}
                            className="bg-[#E94D1A] text-white px-4 py-2 rounded-2xl hover:bg-orange-600 font-medium transition cursor-pointer"
                        >
                            Actualizar resultados
                        </button>
                    )}
                    {partido.estado !== "finalizado" && (
                        <button
                            onClick={() => cambiarEstado(partido)}
                            className="bg-[#374d79] text-white px-4 py-2 rounded-2xl hover:bg-blue-600 font-medium transition cursor-pointer"
                        >
                            {partido.estado === "pendiente"
                                ? "Iniciar Partido"
                                : "Finalizar Partido"}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartaPartido;