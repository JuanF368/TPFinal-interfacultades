import React, { useEffect, useState } from "react"; 
import ConvocatoriaForm from "../components/ConvocatoriaForm"; 
import { etiquetasConvocatoria } from "../data/convocatoriaDatos"; 

const Convocatoria = () => {
    const [convocatoria, setConvocatoria] = useState(null);
    const [edicion, setEdicion] = useState(false); 
    const [estado, setEstado] = useState(""); 

    useEffect(() => {
        const obtenerConvocatoria = async() => {
            try {
                const res = await fetch('http://localhost:3001/convocatoria/estado');
                if (!res.ok){
                    console.warn("No hay convocatoria activa"); 
                    setConvocatoria(null);
                    setEstado(null);
                    return;
                }
                const data = await res.json(); 

                if (res.ok && data.convocatoria){ 
                     const clean = Object.fromEntries( //saca el 00:00:00 del date 
                        Object.entries(data.convocatoria).map(([k, v]) => [
                        k,
                        typeof v === "string" && v.includes("T") ? v.split("T")[0] : v
                        ])
                    );
                    setConvocatoria(clean); 
                    setEstado(data.estado);
                }
            } catch (error){
                console.log("Error al obtener convocatoria: ", error); 
            } 
        }; 
        obtenerConvocatoria(); 
    }, []); 

    const puedeEditar = convocatoria && estado !== "finalizado" && estado !== "fuera de tiempo";

    return  (
        <div className="p-6 sm:p-10 min-h-screen text-center"> 
            <div className="max-w-5xl mx-auto"> 
                <h1 className="text-3xl font-bold mb-4 "> Convocatoria </h1>
                {!convocatoria ? (
                    <> 
                    <div className="bg-white shadow-md rounded-xl p-8">
                        <p className="mb-6 text-gray-600 text-lg">No hay convocatoria activa</p>
                        <ConvocatoriaForm modo="crear" onActualizada={setConvocatoria} />
                    </div>
                    </>
                ) : ( 
                    <>
                    {!edicion ? ( 
                        <div className="bg-white shadow-md rounded-xl p-8 text-left"> 
                            <h2 className="text-xl font-semibold mb-8 "> Convocatoria actual </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8"> 
                                {Object.keys(etiquetasConvocatoria).map((key) => (
                                    <p key={key}> {etiquetasConvocatoria[key]}: <strong> {convocatoria[key]}</strong></p>
                                ))}
                            </div>
                            {puedeEditar && (
                                <div className="text-right mt-2"> 
                                    <button onClick={() => setEdicion(true)} className="mt-4 bg-[#E94D1A] text-white px-4 py-2 rounded-lg
                                    hover:bg-[#ff551c]"> Editar convocatoria </button>
                                </div>
                            )}
                        </div>

                    ) : ( 
                        <ConvocatoriaForm modo="editar" convocatoria={convocatoria} onActualizada={(data) => {
                            setConvocatoria(data);
                            setEdicion(false); 
                        }} /> 
                    )}
                    </>
                )}
            </div>
        </div>
    )
}; 

export default Convocatoria; 