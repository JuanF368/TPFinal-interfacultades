import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const PartidoForm = ({ partido, facultades, disciplinas, exito, cancelar }) => {
    const crear = partido?.nuevo === true;

    const [idfacultad1, setFacultad1] = useState(partido?.facultad1?.idfacultad ?? '');
    const [idfacultad2, setFacultad2] = useState(partido?.facultad2?.idfacultad ?? '');
    const [iddisciplina, setDisciplina] = useState(partido?.iddisciplina ?? '');
    const [fecha, setFecha] = useState(partido?.fecha ?? '');
    const [hora, setHora] = useState(partido?.hora ?? '');
    const [lugar, setLugar] = useState(partido?.lugar ?? '');
    const [resequipo1, setResequipo1] = useState(partido?.resequipo1 ?? '');
    const [resequipo2, setResequipo2] = useState(partido?.resequipo2 ?? '');

    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        try {
            let res;
            if (crear) {
                res = await fetch('http://localhost:3001/resultados', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({
                        idfacultad1,
                        idfacultad2,
                        iddisciplina,
                        fecha,
                        hora,
                        lugar,
                    }),
                });
            } else {
                res = await fetch(`http://localhost:3001/resultados/${partido.idpartido}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ resequipo1, resequipo2 }),
                });
            }

            const data = await res.json();
            if (res.ok) {
                console.log('Resultados actualizados:', data);
                exito();
            } else {
                console.error('Error al actualizar resultados:', data.error);
            }
        } catch (error) {
            console.error('Error al actualizar resultados:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
            <div className="relative bg-[#0F172A] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10">
                
                <button
                    onClick={cancelar}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white transition cursor-pointer"
                >
                    <FaTimes size={18}/>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-[#E94D1A] tracking-wide">
                    {crear ? "Crear Partido" : "Actualizar Resultados"}
                </h2>

                {crear && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Equipo 1:</label>
                            <select className="border border-gray-600 p-2 w-full mb-2 rounded bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none" value={idfacultad1} onChange={(e) => setFacultad1(e.target.value)}>
                                <option value="">Seleccione...</option>
                                {facultades.map(fac => <option key={fac.idfacultad} value={fac.idfacultad}>{fac.siglas}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Equipo 2:</label>
                            <select className="border border-gray-600 p-2 w-full mb-2 rounded bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none" value={idfacultad2} onChange={(e) => setFacultad2(e.target.value)}>
                                <option>Seleccione...</option>
                                {facultades.map(fac => <option key={fac.idfacultad} value={fac.idfacultad}>{fac.siglas}</option>)}
                            </select>
                        </div>
                        <div>
                           <label className="block text-sm text-gray-300 mb-1">Disciplina:</label>
                            <select className="border border-gray-600 p-2 w-full mb-2 rounded bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none" value={iddisciplina} onChange={(e) => setDisciplina(e.target.value)}>
                                <option>Seleccione...</option>
                                {disciplinas.map(d => <option key={d.iddisciplina} value={d.iddisciplina}>{d.nombre}</option>)}
                            </select> 
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-300 mb-1">Fecha:</label>
                                <input
                                    type="date"
                                    className="border border-gray-600 p-2 w-full mb-2 rounded bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-300 mb-1">Hora:</label>
                                <input
                                    type="time"
                                    className="border border-gray-600 p-2 w-full mb-2 rounded bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none"
                                    value={hora}
                                    onChange={(e) => setHora(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Lugar:</label>
                            <input
                                type="text"
                                className="border border-gray-600 p-2 w-full mb-2 rounded bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none"
                                value={lugar}
                                onChange={(e) => setLugar(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {!crear && (
                    <>
                        <p className="text-center mb-4 text-gray-300">
                            <span className="font-bold text-white">{partido.facultad1.siglas}</span> vs{" "}
                            <span className="font-bold text-white">{partido.facultad2.siglas}</span>
                        </p>
                        <div className="flex justify-around mb-8">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-sm mb-1">{partido.facultad1.siglas}</span>
                                <input 
                                    type="number"
                                    min="0"
                                    value={resequipo1}
                                    onChange={(e) => setResequipo1(e.target.value)}
                                    className="border border-gray-600 rounded p-2 w-16 text-center bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none"
                                />
                            </div>
                            <div className="text-lg font-bold self-center text-gray-400">VS</div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-sm mb-1">{partido.facultad2.siglas}</span>
                                <input 
                                    type="number"
                                    min="0"
                                    value={resequipo2}
                                    onChange={(e) => setResequipo2(e.target.value)}
                                    className="border border-gray-600 rounded p-2 w-16 text-center bg-[#1E293B] focus:ring-2 focus:ring-[#E94D1A] outline-none"
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-between gap-3 mt-6">
                    <button
                        onClick={cancelar}
                        className="w-1/2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 bg-[#E94D1A] text-white py-2 rounded-lg hover:bg-[#ff7043] transition cursor-pointer"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PartidoForm;