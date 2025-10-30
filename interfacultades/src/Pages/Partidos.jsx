import React, { useEffect, useState } from "react";
import CartaPartido from "../components/CartaPartido";
import PartidoForm from "../components/PartidoForm";


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

    const cargarPartidos = async () => {
        try {
            const params = new URLSearchParams();
            Object.keys(filtros).forEach(key => {
                if(filtros[key]) params.append(key, filtros[key]);
            });

            const res = await fetch(`http://localhost:3001/api/soap/partidos?${params.toString()}`);
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
                fetch('http://localhost:3001/api/soap/facultades').then(r => r.json()),
                fetch('http://localhost:3001/api/soap/disciplinas').then(r => r.json())
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
                    className="border rounded p-2 cursor-pointer"
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
                    className="border rounded p-2 cursor-pointer"
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
                    className="border rounded p-2 cursor-pointer"
                />

                <button
                    onClick={handleFiltrar}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Filtrar
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partidos.length === 0 ? (
                    <p>No hay partidos que mostrar.</p>
                ) : (
                    partidos.map((p) => (
                        <CartaPartido key={p.idpartido} partido={p} onEditar={setEditandoPartido} />
                    ))
                )}

            </div>

            {editandoPartido && (
                <PartidoForm
                    partido={editandoPartido}
                    exito={() => {
                        setEditandoPartido(null);
                        cargarPartidos();
                    }}
                    cancelar={() => setEditandoPartido(null)}
                />
            )}

        </div>
    );
}; 

export default Partidos; 