import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usuarioActual } from "../utils/auth";

const Usuarios = () => {
    const [seccion, setSeccion] = useState("");
    const [usuarios, setUsuarios] = useState([]); 
    const [pagina, setPagina] = useState(1); 
    const [totalPag, setTotalPag] = useState(1); 
    const [busqueda, setBusqueda] = useState(""); 
    const token = localStorage.getItem("token"); 
    const limite = 20; 
    const user = usuarioActual(); 

    const cargarUsuarios = async() =>{ 
        try{
            const parametros = new URLSearchParams({rol:seccion, busqueda, pagina, limite}); 
            const res = await fetch(`http://localhost:3001/usuarios?${parametros}`, {
                headers: { Authorization: `Bearer ${token}`}
            })

            const data = await res.json(); 
            setUsuarios(data.usuarios || []); 
            setTotalPag(data.paginasTotales || 1); 

        } catch(error){ 
            console.error("Error al cargar usuarios:", error);
            toast.error("Error al listar usuarios!");
        }
    }; 
    
    useEffect(() => {
        cargarUsuarios(); 
    }, [seccion, pagina]);

    useEffect(() => {
        const delay = setTimeout(()=>{
            cargarUsuarios();
        }, 400);
        return () => clearTimeout(delay);
    }, [busqueda]); 

    const cambiarRol = async(id, nuevoRol) => {
        try {
            const res = await fetch(`http://localhost:3001/usuarios/actualizar/${id}`, {
                method: "PUT", headers: { "Content-Type": "application/json",
                Authorization: `Bearer ${token}`} , body: JSON.stringify({ nuevoRolId: parseInt(nuevoRol)})});

            if(res.ok){
                await cargarUsuarios(); 
                toast.success("Rol del usuario cambiado con exito!"); 
            }
            
        } catch(error){
            console.error("Error alcambiar rol:", error);
            toast.error("Error al cambiar rol!"); 
        }
    }
    
    return (
        <div className="p-4 text-left w-full max-w-5xl"> 
            <h1 className="text-2xl sm:text-3xl font-bold mb-6"> Administracion de usuarios </h1>
            <div className="mb-4 flex justify-between items-center mt-10"> {/**buscador general que busca en todos los roles por nombre o apellido sino por seccion */} 
                <input type="text" placeholder="Buscar por nombre o apellido" value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} className="border-[#E94D1A] border-2 rounded-md px-3 py-2 w-full max-w-lg"/>
            </div>
            <div className="flex flex-wrap font-bold space-x-6 mb-4 pb-2  text-gray-600 mt-10">
                <button onClick={() =>{setSeccion(""); setPagina(1);}} className={`  cursor-pointer capitalize ${seccion==="" ? "text-[#E94D1A] border-b-2 border-[#E94D1A]" : "hover:text-[#E94D1A]" }`} >
                Todos </button>
                {["usuario", "inscripto" , "jugador", "profesor", "secretario", "administrador"].map((rol) => (
                    <button key={rol} onClick={() => { setSeccion(rol); setPagina(1)}} 
                    className={`  cursor-pointer capitalize ${seccion === rol ? "text-[#E94D1A] border-b-2 border-[#E94D1A]"
                    : "hover:text-[#E94D1A]"}`}> 
                        {rol}
                    </button>
                ))}
            </div>
            <div className="space-y-3">
                {usuarios.length === 0 ? (
                    <h2 className="text-center"> No se encontraron usuarios</h2>
                ) : ( 
                    usuarios.map((u) => (
                        <>
                        <div key={u.idusuario} className="flex flex-col md:flex-row  p-3 space-y-2 ">
                            <div className="flex flex-col md:grid md:grid-cols-3 w-full md:items-center">
                               <div className="cursor-default text-sm md:text-base">
                                    <p><strong>{u.usnombre} {u.usapellido}</strong></p>
                                </div>
                                <div className="cursor-default text-sm md:text-base text-gray-700 text-left md:text-center mt-1 md:mt-0">
                                    <p>{u.usmail}</p>
                                </div>
                            </div>
                            
                            <div className="mt-2 md:mt-0 md:text-right">
                                <select  value={u.rol?.idrol || ""} onChange={(e) => cambiarRol(u.idusuario, e.target.value)}
                                className=" cursor-pointer border-2 border-[#E94D1A] rounded-lg px-3 py-1 text-sm md:text-base"
                                disabled={(u.rol?.rodescripcion === "administrador" && user.rodescripcion !== "administrador") || 
                                (user.rodescripcion !== "administrador" && user.rodescripcion !== "profesor")} > 
                                    <option value="1">Usuario</option>
                                    <option value="2">Inscripto</option>
                                    <option value="3">Jugador</option>
                                    <option value="4">Profesor</option>
                                    <option value="5">Secretario</option>
                                    <option value="6" disabled={user.rodescripcion === "profesor"}>Admin</option>
                                </select>
                            </div>
                            <hr className="m-4 border border-[#ddd]"/>
                        </div>
                        
                        </>
                    ))
                )}
            </div>
            <div className="flex justify-center mt-5 space-x-2 flex-wrap">
                {Array.from({ length: totalPag }, (_, i) => i + 1).map((num) => (
                <button key={num} onClick={() => setPagina(num)}className={`px-3 py-1 rounded-md ${
                    pagina === num ? "bg-[#E94D1A] text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
                    {num} </button>
                ))}
            </div>
        </div>
    )
}

export default Usuarios; 