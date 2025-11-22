import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router";
import { FaHome, FaFutbol, FaNewspaper, FaClipboardCheck, FaUsers, FaBullhorn} from 'react-icons/fa';
import { IoMdPhotos, IoMdSettings } from 'react-icons/io';
import { FaWpforms } from "react-icons/fa6";
import { isAuthenticated, usuarioActual } from "../utils/auth";
import { NavLink } from "react-router-dom";

const SideBar = ({abierto, setAbierto }) => {
    const navigate = useNavigate(); 
    const logueado = isAuthenticated();
    const usuario = usuarioActual();
    const [estado, setEstado] = useState("");

    const classNameNavLink = "flex flex-row items-center p-2 hover:bg-[#1e2a49] rounded-lg transition md:flex-col";
 
    const irAPagina = (path) => {
        navigate(path);
    };

    useEffect(()=>{ 
    const fetchConvocatoria = async () => {
      try { 
        const response = await fetch("http://localhost:3001/convocatoria/estado"); 
        const data = await response.json(); 
        setEstado(data.estado); 
      } catch(error){
        console.error("Error al obtener la convocatoria:", error);
      }
    }; 
    fetchConvocatoria(); 
  }, []); 
 
    return (
        <>
            {abierto && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 md:hidden"
                    onClick={() => setAbierto(false)}
                />
            )}
            <div className={`fixed left-0 bottom-0 bg-[#26375f] z-50 transition-all duration-300 ease-in-out text-white shadow-md h-full
            ${abierto ? "w-64 translate-x-0" : "w-16 -translate-x-full"}  overflow-y-auto pt-4 flex flex-col md:translate-x-0 md:w-25`}> 
                <nav className="flex flex-col flex-grow justify-between" >
                    <ul className="flex flex-col">
                        <li onClick={() => {irAPagina('/'); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaHome size={24}/>
                            <span className="text-md font-semibold ml-2 md:ml-0"> 
                                Inicio
                            </span>
                        </li>
                         <li onClick={() => {irAPagina("/publicaciones"); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaNewspaper size={24}/>
                            <span className="text-sm font-semibold ml-2 md:ml-0"> 
                                Publicaciones
                            </span>
                        </li>
                         <li onClick={() => {irAPagina("/partidos"); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaFutbol size={24}/>
                            <span className="text-md font-semibold ml-2 md:ml-0"> 
                                Partidos
                            </span>
                        </li>
                        
                        <li onClick={() => {irAPagina("/galeria"); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <IoMdPhotos size={24}/>
                            <span className="text-md font-semibold ml-2 md:ml-0"> 
                                Galería
                            </span>
                        </li>
                        { logueado &&(
                            <> 
                            {(usuario?.rodescripcion === "administrador" || usuario?.rodescripcion ==="profesor") && (
                                <>
                                <li onClick={() => {irAPagina("/usuarios"); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors  cursor-pointer">
                                    <FaUsers size={24}/>
                                     <span className="text-sm font-semibold ml-2 md:ml-0">
                                        Administrar Usuarios
                                    </span>
                                </li>
                                </>
                            )}
                            { usuario?.rodescripcion === "secretario" || usuario?.rodescripcion === "administrador" && (
                                <>
                                <li onClick={() => {irAPagina("/disciplinasYfacultades"); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                                    <IoMdSettings size={24}/>
                                     <span className="text-sm font-semibold ml-2 md:ml-0">
                                        Disciplinas y Facultades
                                    </span>
                                </li>
                                </>
                            )}
                            { usuario?.rodescripcion ==="administrador" && ( 
                                <>
                                <li onClick={() => {irAPagina("/convocatoria"); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                                    <FaBullhorn size={24}/>
                                    <span className="text-sm font-semibold ml-2 md:ml-0">
                                        Convocatoria
                                    </span>
                                </li>
                                </>
                            )}
                            { estado !== 'fuera de tiempo' && 
                            (usuario?.rodescripcion === "usuario" || usuario?.rodescripcion ==="jugador" ||  usuario?.rodescripcion ==="inscripto" ) && (
                                <>
                                <li onClick={() => {irAPagina("/inscripcion"); setAbierto(false);}} className="flex md:flex-col items-center p-3 text-[#E94D1A] hover:bg-gray-100 hover:text-[#c23c0f] rounded-lg mx-2 my-1 transition-colors  cursor-pointer">
                                    <FaWpforms size={24}/>
                                     <span className="text-sm font-semibold ml-2 md:ml-0">
                                        Inscripcion
                                    </span>
                                </li>
                                </>
                            )}
                            </>
                            )}
                        </ul>
                        <ul>
                        <li onClick={() => {irAPagina("/reglamentos"); setAbierto(false);}} className="flex md:flex-col items-center p-3 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaClipboardCheck size={24}/>
                            <span className="text-sm font-semibold ml-2 md:ml-0"> 
                                Reglamentos
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default SideBar;