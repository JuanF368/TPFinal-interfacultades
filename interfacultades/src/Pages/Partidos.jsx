import React, { useEffect, useState } from "react";


const Partidos = () => {
    const [partidos, setPartidos] = useState([]);
    const [facultades, setFacultades] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [filtros, setFiltros] = useState({
        idfacultad: '',
        iddisciplina: '',
        fecha: ''
    });

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
                fetch('http://localhost:3001/disciplina').then(r => r.json())
            ]);
            setFacultades(Array.isArray(facRes) ? facRes : []);
            setDisciplinas(Array.isArray(disRes) ? disRes : []);
        } catch (error) {
            console.error('Error al cargando opciones:', error);
            setFacultades([]);
            setDisciplinas([]);
        }
    };

    useEffect(() => {
        cargarOpciones();
        cargarPartidos();
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
                    className="border rounded p-2"
                >
                    <option value="">Todas las facultades</option>
                    {facultades.map(fac => (
                        <option key={fac.idfacultad} value={fac.idfacultad}>{fac.siglas}</option>
                    ))}
                </select>

                <select
                    name="iddisciplina"
                    value={filtros.iddisciplina}
                    onChange={handleFiltroChange}
                    className="border rounded p-2"
                >
                    <option value="">Todas las disciplinas</option>
                    {disciplinas.map(dis => (
                        <option key={dis.iddisciplina} value={dis.iddisciplina}>{dis.nombre}</option>
                    ))}
                </select>

                <input
                    type="date"
                    name="fecha"
                    value={filtros.fecha}
                    onChange={handleFiltroChange}
                    className="border rounded p-2"
                />

                <button
                    onClick={handleFiltrar}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Filtrar
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partidos.length === 0 ? (
                    <p>No hay partidos que mostrar.</p>
                ) : (
                    partidos.map(p => (
                        <div key= {p.idpartido} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>{p.fecha}</span>
                                <span>{p.hora}</span>
                            </div>
                            <div className="text-xl font-semibold mb-1">{p.disciplina.nombre}</div>
                            <div className="text-gray-700 mb-2">{p.lugar}</div>
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <div className="font-bold">{p.equipo1.facultad.siglas}</div>
                                    <div className="text-lg">{p.resequipo1 ?? '-'}</div>
                                </div>
                                <div className="text-lg font-bold"> vs </div>
                                <div className="text-center">
                                    <div className="font-bold">{p.equipo2.facultad.siglas}</div>
                                    <div className="text-lg">{p.resequipo2 ?? '-'}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
}; 

export default Partidos; 