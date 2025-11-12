import React, { useEffect, useState } from "react";
import CartaPartido from "../components/CartaPartido";
import PartidoForm from "../components/PartidoForm";
import { usuarioActual } from "../utils/auth";
import { FaCalendar } from "react-icons/fa";
import socket from "../utils/socket";


const Partidos = () => {
    const [partidos, setPartidos] = useState([]);
    const [facultades, setFacultades] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [editandoPartido, setEditandoPartido] = useState(null);
    const [filtros, setFiltros] = useState({
        idfacultad: '',
        iddisciplina: '',
        fecha: ''
    });
    const user = usuarioActual();

    const cargarPartidos = async () => {
        try {
            const params = new URLSearchParams();
            Object.keys(filtros).forEach(key => {
                if(filtros[key]) params.append(key, filtros[key]);
            });

            const res = await fetch(`http://localhost:3001/resultados?${params.toString()}`);
            const data = await res.json();

            if(Array.isArray(data)) {
                setPartidos(data);
            } else {
                console.error('Error al cargar los partidos:', data);
                setPartidos([]);
            }
        } catch (error) {
            console.error('Error al cargar los partidos:', error);
            setPartidos([]);
        }
    };

    const cargarOpciones = async () => {
        try {
            const [ facRes, disRes ] = await Promise.all([
                fetch('http://localhost:3001/facultades').then(r => r.json()),
                fetch('http://localhost:3001/disciplina').then(r => r.json()),
            ]);
            setFacultades(Array.isArray(facRes) ? facRes : []);
            setDisciplinas(Array.isArray(disRes) ? disRes : []);
        } catch (error) {
            console.error('Error al cargando opciones:', error);
            setFacultades([]);
            setDisciplinas([]);
        }
    };

    const cambiarEstado = async (partido) => {
        const nextState = partido.estado === 'pendiente' ? 'en_curso' : 'finalizado';
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/resultados/estado/${partido.idpartido}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ estado: nextState })
        });
        if(res.ok) {
            console.log('Estado cambiado correctamente');
        } else {
            const data = await res.json();
            console.error('Error al cambiar estado:', data);
        }
    }

    useEffect(() => {
        cargarOpciones();
        cargarPartidos();

        socket.on('actualizarPartidos', cargarPartidos);

        return () => {
            socket.off('actualizarPartidos', cargarPartidos);
        }
    }, []);

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    const handleFiltrar = () => {
        cargarPartidos();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Partidos</h1>

            <div className="flex flex-wrap gap-4 mb-6">
                <select
                    name="idfacultad"
                    value={filtros.idfacultad}
                    onChange={handleFiltroChange}
                    className="rounded-2xl border p-3 bg-[#112349] text-white font-semibold shadow-md cursor-pointer transition-all duration-100 hover:bg-[#243E73] focus:outline-none focus:ring-[#4a90e2] focus:ring-2 scrollbar-thin scrollbar-thumb-[#4a90e2] scrollbar-track-gray-200 focus:rounded-b-none"
                >
                    <option value="" className="bg-[#1b2b48] text-white">Todas las facultades</option>
                    {facultades.map(fac => (
                        <option key={fac.idfacultad} value={fac.idfacultad} className="bg-[#1b2b48] text-white">{fac.siglas}</option>
                    ))}
                </select>

                <select
                    name="iddisciplina"
                    value={filtros.iddisciplina}
                    onChange={handleFiltroChange}
                    className="rounded-2xl border p-3 bg-[#112349] text-white font-semibold shadow-md cursor-pointer transition-all duration-100 hover:bg-[#243E73] focus:outline-none focus:ring-[#4a90e2] focus:ring-2 scrollbar-thin scrollbar-thumb-[#4a90e2] scrollbar-track-gray-200 focus:rounded-b-none"
                >
                    <option value="" className="bg-[#1b2b48] text-white">Todas las disciplinas</option>
                    {disciplinas.map(dis => (
                        <option key={dis.iddisciplina} value={dis.iddisciplina} className="bg-[#1b2b48] text-white">{dis.nombre}</option>
                    ))}
                </select>
                <div className="rounded-2xl relative flex items-center border bg-[#112349] text-white font-semibold shadow-md cursor-pointer transition-all duration-200 hover:bg-[#243E73] focus-within:ring-[#4a90e2] focus-within:ring-2 focus-within:rounded-b-none">
                    <input
                        type="date"
                        id="date-calendario-custom"
                        name="fecha"
                        value={filtros.fecha}
                        onChange={handleFiltroChange}
                        className="bg-transparent outline-none p-3 appearance-none cursor-pointer"
                    />
                    <FaCalendar className="absolute right-3 text-white pointer-events-none"/>
                </div>


                <button
                    onClick={handleFiltrar}
                    className="w-30 bg-[#E94D1A] text-white px-4 py-2 rounded-2xl hover:bg-[#d53500] cursor-pointer"
                >
                    Filtrar
                </button>
            </div>
            {user?.rodescripcion === "profesor" && (
                <button
                    onClick={() => setEditandoPartido({ nuevo: true })}
                    className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 mb-4 cursor-pointer"
                >
                    Nuevo Partido
                </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partidos.length === 0 ? (
                    <p>No hay partidos que mostrar.</p>
                ) : (
                    partidos.map((p) => (
                        <CartaPartido key={p.idpartido} partido={p} onEditar={setEditandoPartido} cambiarEstado={cambiarEstado} />
                    ))
                )}

            </div>

            {editandoPartido && (
                <PartidoForm
                    partido={editandoPartido}
                    facultades={facultades}
                    disciplinas={disciplinas}
                    exito={() => {
                        setEditandoPartido(null);
                    }}
                    cancelar={() => setEditandoPartido(null)}
                />
            )}

        </div>
    );
}; 

export default Partidos; 