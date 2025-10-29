import React, { useState } from "react";
import { toast } from "react-toastify";
import { etiquetasConvocatoria } from "../data/convocatoriaDatos"; 


const ConvocatoriaForm = ({ modo, convocatoria, onActualizada}) => {
    const [formData, setFormData] = useState(
    convocatoria || Object.fromEntries(Object.keys(etiquetasConvocatoria).map(key => [key, ""]))
    );
    const token = localStorage.getItem("token"); 

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        try{ 
            const url = modo === "editar" ? 
            `http://localhost:3001/convocatoria/editarConvocatoria/${convocatoria.idconvocatoria}`
            : "http://localhost:3001/convocatoria/crearConvocatoria";
            const method = modo === "editar" ? "PUT" : "POST"; 

            const res = await fetch(url, { 
                method, headers:{"Content-Type": "application/json", 'Authorization': `Bearer ${token}` }, body: JSON.stringify(formData),
            }); 
            const data = await res.json(); 
            if (res.ok){
                toast.success( modo==="editar" ? "Convocatoria editada con exito" : "Convocatoria creada con exito");
                onActualizada(data.convocatoria);
            } else {
                toast.error("Error al guardar la convocatoria"); 
            }

        } catch (error) {
            console.error(error);
            toast.error("Ocurrio un error");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 sm:p-8 max-w-4xl mx-auto"> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            {Object.keys(etiquetasConvocatoria).map((key) => (
              <div key={key} className="flex flex-col mb-4">
                <label className="font-medium text-gray-700 mb-2 break-words leading-snug" htmlFor={key}>
                  {etiquetasConvocatoria[key]}
                </label>
                <input type="date" id={key} name={key} value={formData[key] || ""} onChange={handleChange}
                  required className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 "/>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button type="submit" className="bg-[#E94D1A] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#fa5b25]">
              {modo === "editar" ? "Guardar cambios" : "Crear convocatoria"}
            </button>
          </div>
          
        </form>
    )
}

export default  ConvocatoriaForm; 