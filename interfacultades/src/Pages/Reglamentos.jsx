import { useEffect, useState } from "react";

const Reglamentos = () => {
    const [disciplinas, setDisciplinas] = useState([]);

    const getDisciplinas = async () => {
        try {
            const res = await fetch("http://localhost:3001/disciplina");
            const data = await res.json();
            setDisciplinas(data);
        } catch (error) {
            console.error("Error al obtener las disciplinas:", error);
        }
    }

    useEffect(() => {
        getDisciplinas();
    }, []);


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Reglamentos oficiales</h1>
            <h3 className="text-gray-500">Juegos Intercaultades UNCo {new Date().getFullYear()}</h3>

            <div className="grid grid-cold-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {disciplinas.map((disc) => (
                    <div key={disc.iddisciplina} className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">{disc.nombre}</h2>
                        <button
                            onClick={() => window.open(disc.reglamento, '_blank')}
                            className="bg-[#E94D1A] text-white px-4 py-2 rounded hover:bg-[#c74116] cursor-pointer transition"
                        >
                            Ver reglamento
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reglamentos