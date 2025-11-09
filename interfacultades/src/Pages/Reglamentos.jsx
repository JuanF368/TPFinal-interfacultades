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
            <h1 className="text-3xl font-bold mb-2 text-center">Reglamentos oficiales</h1>
            <h3 className="text-gray-500 mb-6 text-center">Juegos Interfacultades UNCo {new Date().getFullYear()}</h3>
            {reglamento.map((seccion, i) => (
                <section key={i} className="mb-5 text-left">
                    <button
                        onClick={() => toggleSeccion(i)}
                        className="w-full flex justify-between items-center bg-[#f8f8f8] hover:bg-[#f1f1f1] px-6 py-4 text-left transition-all duration-300 cursor-pointer shadow-md border border-gray-200 ease-in-out group"
                    >
                        <h2 className="text-xl font-semibold text-[#bd3f15]">
                            {seccion.titulo}
                        </h2>
                        <FaChevronDown
                            className={`text-[#bd3f15] text-lg transform transition-transform duration-300 ease-in-out ${abiertos[i] ? "rotate-180" : "rotate-0"}`}
                        />
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${abiertos[i] ? "max-h[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                        <div className="bg-white rounded-xl shadow-inner p-5 border border-gray-100">
                            {seccion.contenido.map((parrafo, j) =>(
                                <p key={j} className="mb-3 text-gray-700" dangerouslySetInnerHTML={{ __html: parrafo }}>
                                </p>
                            ))}
                            {seccion.titulo.startsWith("6.") && (
                                <div className="mt-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {disciplinas.length > 0 ? (
                                            disciplinas.map((disc) => (
                                                <div key={disc.iddisciplina} className="bg-gray-50 shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out">
                                                    <h4 className="text-lg font-semibold mb-3 text-[#bd3f15]">
                                                        {disc.nombre}
                                                    </h4>
                                                    <button
                                                        onClick={() => window.open(disc.reglamento, "_blank")}
                                                        className="bg-[#E94D1A] text-white px-4 py-2 rounded-md w-full hover:bg-[#c74116] transition-all duration-300 cursor-pointer"
                                                    >
                                                        Ver reglamento
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 col-span-full text-center">
                                                Cargando disciplinas...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Reglamentos