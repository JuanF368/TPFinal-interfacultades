import React, { useState }  from "react";
import { useNavigate } from "react-router";
import { FaHome, FaFutbol, FaBars, FaNewspaper, FaClipboardCheck} from 'react-icons/fa';
import { IoMdPhotos } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
const SideBar = () => {
    const [abierto, setAbierto] = useState(false);
    const navigate = useNavigate(); 
    
    const irAPagina = (path) => {
        navigate(path);
    };

    return (
        <div className="flex"> 
            <div className={` top-0 left-0 md:w-64 bg-[#243E73] transition-width duration-300 text-white 
                ${abierto ? "w-64" : "w-20"}
                `}> 
                <div className="flex justify-between items-center p-4">
                    <h2 className={`text-3xl font-bold  md:block ${abierto ? "block" : "hidden"}`}> Interfacultades </h2>
                    <button className="block md:hidden " onClick={()=> setAbierto(!abierto) }>
                        { abierto ? <IoCloseSharp size={24} /> : <FaBars size={24}/> } 
                    </button>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li onClick={() => irAPagina('/')}className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaHome size={24}/>
                            <span className={`ml-4 md:block ${abierto ? "block" : "hidden"}`}> 
                                Inicio
                            </span>
                        </li>
                         <li onClick={() => irAPagina("/publicaciones")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaNewspaper size={24}/>
                            <span className={`ml-4 md:block ${abierto ? "block" : "hidden"}`}> 
                                Publicaciones
                            </span>
                        </li>
                         <li onClick={() => irAPagina("/partidos")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaFutbol size={24}/>
                            <span className={`ml-4 md:block ${abierto ? "block" : "hidden"}`}> 
                                Partidos
                            </span>
                        </li>
                        <li onClick={() => irAPagina("/reglamentos")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <FaClipboardCheck size={24}/>
                            <span className={`ml-4 md:block ${abierto ? "block" : "hidden"}`}> 
                                Reglamentos
                            </span>
                        </li>
                        <li onClick={() => irAPagina("/galeria")} className="flex items-center p-4 hover:bg-[#2b4c8e] cursor-pointer">
                            <IoMdPhotos size={24}/>
                            <span className={`ml-4 md:block ${abierto ? "block" : "hidden"}`}> 
                                Galería
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;