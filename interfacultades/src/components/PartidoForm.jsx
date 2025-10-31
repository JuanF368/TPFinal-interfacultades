import React, { useState } from "react";

const PartidoForm = ({ partido, exito, cancelar }) => {
    const [resequipo1, setResequipo1] = useState(partido.resequipo1 ?? '');
    const [resequipo2, setResequipo2] = useState(partido.resequipo2 ?? '');

    const actualizarResultados = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:3001/soap/partidos/${partido.idpartido}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ resequipo1, resequipo2 }),
            });
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
    }

    return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Actualizar Resultados</h2>
            <p className="text-center mb-4 text-gray-600">
                {partido.equipo1.facultad.siglas} vs {partido.equipo2.facultad.siglas}
            </p>
            <div className="flex justify-around mb-6">
                <div className="flex flex-col items-center">
                    <span className="font-bold mb-1">{partido.equipo1.facultad.siglas}</span>
                    <input 
                        type="number"
                        min="0"
                        value={resequipo1}
                        onChange={(e) => setResequipo1(e.target.value)}
                        className="border rounded p-2 w-16 text-center"
                    />
                </div>
                <div className="text-lg font-bold self-center">vs</div>
                <div className="flex flex-col items-center">
                    <span className="font-bold mb-1">{partido.equipo2.facultad.siglas}</span>
                    <input 
                        type="number"
                        min="0"
                        value={resequipo2}
                        onChange={(e) => setResequipo2(e.target.value)}
                        className="border rounded p-2 w-16 text-center"
                    />
                </div>
            </div>


            <div className="flex justify-between gap-3">
                <button
                    onClick={cancelar}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    onClick={actualizarResultados}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                    Confirmar
                </button>
            </div>
        </div>
    </div>
    );
};

export default PartidoForm;