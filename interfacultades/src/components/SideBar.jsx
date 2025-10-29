import React, { useState }  from "react";
import { useNavigate } from "react-router";
import { FaHome, FaFutbol, FaNewspaper, FaClipboardCheck, FaUsers, FaBullhorn} from 'react-icons/fa';
import { IoMdPhotos } from 'react-icons/io';
import { isAuthenticated, usuarioActual } from "../utils/auth";
const SideBar = ({abierto}) => {
    const navigate = useNavigate(); 
    const logueado = isAuthenticated();
    const usuario = usuarioActual();

    const irAPagina = (path) => {
        navigate(path);
    };

    return (
            <div className={`fixed top-16 left-0 bottom-0 bg-[#243E73] z-10 transition-all duration-300 text-white 
            ${abierto ? "w-64" : "w-16"}  overflow-y-auto pt-1`}> 
                <nav >
                    <ul>
                        <li onClick={() => irAPagina('/')}className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaHome size={24}/>
                            {abierto && <span className={`ml-3`}> 
                                Inicio
                            </span>}
                        </li>
                         <li onClick={() => irAPagina("/publicaciones")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaNewspaper size={24}/>
                            {abierto &&  <span className={`ml-3`}> 
                                Publicaciones
                            </span>}
                        </li>
                         <li onClick={() => irAPagina("/partidos")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaFutbol size={24}/>
                            {abierto && <span className={`ml-4`}> 
                                Partidos
                            </span>}
                        </li>
                        <li onClick={() => irAPagina("/reglamentos")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaClipboardCheck size={24}/>
                            {abierto && <span className={`ml-3`}> 
                                Reglamentos
                            </span>}
                        </li>
                        <li onClick={() => irAPagina("/galeria")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <IoMdPhotos size={24}/>
                            {abierto && <span className={`ml-3`}> 
                                Galería
                            </span>}
                        </li>
                        { logueado &&(
                            <> 
                            {(usuario?.rodescripcion === "administrador" || usuario?.rodescripcion ==="profesor") && (
                                <>
                                <li onClick={() => irAPagina("/usuarios")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                                    <FaUsers size={24}/>
                                     {abierto && <span className="ml-3">
                                        Administrar Usuarios
                                    </span>}
                                </li>
                                </>
                            )}
                            { usuario?.rodescripcion ==="administrador" && ( 
                                <>
                                <li onClick={() => irAPagina("/convocatoria")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                                    <FaBullhorn size={24}/>
                                    {abierto && <span className="ml-3">
                                        Convocatoria
                                    </span>}
                                </li>
                                </>
                            )}
                            
                            </>
                        )}
                    </ul>
                </nav>
            </div>
    );
};

export default SideBar;