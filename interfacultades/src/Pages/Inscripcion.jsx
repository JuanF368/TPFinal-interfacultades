import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import InscripcionForm from "../components/InscripcionForm";
import { usuarioActual } from "../utils/auth";

const Inscripcion = () => {
    const [estado, setEstado] = useState('');
    const [convocatoria, setConvocatoria] = useState(null); 
    const [inscripto, setInscripto] = useState(false); 
    const token = localStorage.getItem("token");
    const usuario = usuarioActual(); 

    useEffect(() => {
        const fetchConvocatoria = async () => {
            try { 
                const response = await fetch("http://localhost:3001/convocatoria/estado");
                const data = await response.json();
                setConvocatoria(data.convocatoria);
                setEstado(data.estado);
            } catch (error){
                console.error("Error al obtener la convocatoria:", error);
            }
        }; 
        fetchConvocatoria(); 
    }, []);

    useEffect(()=> {
        if(!convocatoria || !usuario ){
            return; 
        } 
        const verficar = async () => { 
            try { 
                const res = await fetch(`http://localhost:3001/inscripcion/estado/${usuario.idusuario}/${convocatoria.idconvocatoria}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json();
                setInscripto(data.inscripto); 
            }catch(error){ 
                console.error("Error al verificar la inscripcion", error); 
            }
        }
        verficar();
    }, [convocatoria, usuario]);

    const estaInscripto = () => {
        setInscripto(true);
    };
   
    return ( 
        <> 
        { inscripto ? ( 
            <div className="bg-green-100  text-green-800 px-6 py-4 rounded-xl text-center max-w-lg mx-auto mt-10">
                    <h2 className="text-xl font-semibold"> Ya estas inscripto  para representar a tu facultad en las Interfacultades</h2>
                </div>
        ) : ( 
             (convocatoria && estado ==="inscripcion de unidades academicas") ? (
                <div className="bg-white shadow-md rounded-xl p-8"> 
                    <div className='max-w-lg mx-auto mt-10 bg-white shadow-lg p-6 rounded-2xl'>
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                            Inscripcion Interfacultades UNCO 
                        </h2>
                        <InscripcionForm convocatoria={convocatoria} />
                    </div>
                </div>
                
            ) : ( 
               <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    No hay convocatoria abierta para inscribirse
                </h2>
            )
        )}
        </>
    )
}

export default Inscripcion; 