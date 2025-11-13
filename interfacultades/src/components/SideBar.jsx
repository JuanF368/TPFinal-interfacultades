import React, { useState }  from "react";
import { useNavigate } from "react-router";
import { FaHome, FaFutbol, FaNewspaper, FaClipboardCheck, FaUsers, FaBullhorn} from 'react-icons/fa';
import { IoMdPhotos } from 'react-icons/io';
import { FaWpforms } from "react-icons/fa6";
import { isAuthenticated, usuarioActual } from "../utils/auth";
const SideBar = ({abierto}) => {
    const navigate = useNavigate(); 
    const logueado = isAuthenticated();
    const usuario = usuarioActual();

    const irAPagina = (path) => {
        navigate(path);
    };

    return (
            <div className={`fixed top-16 left-0 bottom-0 bg-[#ffffff] z-21 transition-all duration-300 text-white shadow-md rounded-r-2xl h-[90%]
            ${abierto ? "w-64" : "w-16"}  overflow-y-auto pt-4 flex flex-col`}> 
                <nav className="flex flex-col flex-grow justify-between" >
                    <ul className="flex flex-col">
                        <li onClick={() => irAPagina('/')}className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaHome size={24}/>
                            {abierto && <span className={`ml-3`}> 
                                Inicio
                            </span>}
                        </li>
                         <li onClick={() => irAPagina("/publicaciones")} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaNewspaper size={24}/>
                            {abierto &&  <span className={`ml-3`}> 
                                Publicaciones
                            </span>}
                        </li>
                         <li onClick={() => irAPagina("/partidos")} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaFutbol size={24}/>
                            {abierto && <span className={`ml-4`}> 
                                Partidos
                            </span>}
                        </li>
                        
                        <li onClick={() => irAPagina("/galeria")} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <IoMdPhotos size={24}/>
                            {abierto && <span className={`ml-3`}> 
                                Galería
                            </span>}
                        </li>
                        { logueado &&(
                            <> 
                            {(usuario?.rodescripcion === "administrador" || usuario?.rodescripcion ==="profesor") && (
                                <>
                                <li onClick={() => irAPagina("/usuarios")} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors  cursor-pointer">
                                    <FaUsers size={24}/>
                                     {abierto && <span className="ml-3">
                                        Administrar Usuarios
                                    </span>}
                                </li>
                                </>
                            )}
                            { usuario?.rodescripcion ==="administrador" && ( 
                                <>
                                <li onClick={() => irAPagina("/convocatoria")} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                                    <FaBullhorn size={24}/>
                                    {abierto && <span className="ml-3">
                                        Convocatoria
                                    </span>}
                                </li>
                                </>
                            )}
                            {(usuario?.rodescripcion === "usuario" || usuario?.rodescripcion ==="jugador") && (
                                <>
                                <li onClick={() => irAPagina("/inscripcion")} className="flex items-center p-3 text-[#E94D1A] hover:bg-gray-100 hover:text-[#c23c0f] rounded-lg mx-2 my-1 transition-colors  cursor-pointer">
                                    <FaWpforms size={24}/>
                                     {abierto && <span className="ml-3">
                                        Inscripcion
                                    </span>}
                                </li>
                                </>
                            )}
                            </>
                        )}
                        </ul>
                        <ul>
                        <li onClick={() => irAPagina("/reglamentos")} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-[#243E73] rounded-lg mx-2 my-1 transition-colors cursor-pointer">
                            <FaClipboardCheck size={24}/>
                            {abierto && <span className={`ml-3`}> 
                                Reglamentos
                            </span>}
                        </li>
                    </ul>
                </nav>
            </div>
    );
};

export default SideBar;