import { useEffect, useState } from "react";
import reglamento from '../data/reglamentoGeneral.json';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Reglamentos = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [abiertos, setAbiertos] = useState({});

    const getDisciplinas = async () => {
        try {
            const res = await fetch("http://localhost:3001/disciplina");
            const data = await res.json();
            setDisciplinas(data);
        } catch (error) {
            console.error("Error al obtener las disciplinas:", error);
        }
    };

    useEffect(() => {
        getDisciplinas();
    }, []);

    const toggleSeccion = (index) => {
        setAbiertos((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="p-6 text-gray-800 leading-relaxed">
            <h1 className="text-3xl font-bold mb-6 text-center">Reglamentos oficiales</h1>
            <h3 className="text-gray-500 mb-20 text-center">Juegos Interfacultades UNCo {new Date().getFullYear()}</h3>
            {reglamento.map((seccion, i) => (
                <section key={i} className="mb-10 text-left">
                    <button
                        onClick={() => toggleSeccion(i)}
                        className="w-full flex justify-between items-center bg-[#f5f5f5] hover:bg-[#f0f0f0] px-5 py-3 text-left transition cursor-pointer"
                    >
                        <h2 className="text-2xl font-semibold mb-2 text-[#bd3f15]">
                            {seccion.titulo}
                        </h2>
                        {abiertos[i] ? (
                            <FaChevronUp className="text-[#bd3f15]" />
                        ) : (
                            <FaChevronDown className="text-[#bd3f15]" />
                        )}
                    </button>
                    {abiertos[i] && (
                        <div className="p-5">
                            {seccion.contenido.map((parrafo, j) =>(
                                <p key={j} className="mb-2" dangerouslySetInnerHTML={{ __html: parrafo }}>
                                </p>
                            ))}
                            {seccion.titulo.startsWith("6.") && (
                                <div className="mt-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {disciplinas.length > 0 ? (
                                            disciplinas.map((disc) => (
                                                <div key={disc.iddisciplina} className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition">
                                                    <h4 className="tesxt-lg font-semibold mb-2">{disc.nombre}</h4>
                                                    <button
                                                        onClick={() => window.open(disc.reglamento, "_blank")}
                                                        className="bg-[#E94D1A] text-white px-4 py-2 rounded hover:bg-[#c74116] transition cursor-pointer"
                                                    >
                                                        Reglamento {disc.nombre}
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 col-span-full">
                                                Cargando disciplinas...
                                            </p>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            ))}
        </div>
    )
}

export default Reglamentos