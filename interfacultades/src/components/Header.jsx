import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router";
import CartelConfirmacion from "./CartelConfirmacion";
import { IoCloseSharp } from 'react-icons/io5';

const Header = ({abierto, setAbierto, notiCount}) => {
    const [estaLogueado, setEstaLogueado] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setEstaLogueado(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setEstaLogueado(false);
        setMostrarConfirmacion(false); 
        navigate("/");
    };

    return(
        <>
        <header className="fixed left-1/2 transform -translate-x-1/2 w-[99%] bg-[#374d79] shadow-lg rounded-2xl z-50 ">
            <div className="flex items-center justify-between px-6 py-2 pr-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => setAbierto(!abierto)}
                        className="text-white hover:text-gray-300 cursor-pointer">
                        {abierto ? <IoCloseSharp size={26}/> : <FaBars size={26}/>}
                    </button>
                    <div className="cursor-pointer flex items-center" onClick={() => navigate("/")}>
                        <img src="/logos/logo-interfacultades.png" alt="logo-interfacultades" className="h-14" />
                        <span className="ml-2 font-semibold text-xl text-white">Interfacultades</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    {!estaLogueado ? (
                        <>
                            <Button text = "Registrarse" url="/register" />
                            <Button text = "Iniciar Sesión" url="/login" />
                        </>
                    ) : (
                        <>
                        <div className="relative cursor-pointer" onClick={() => navigate("/perfil")}>
                            <FaUserCircle size={28} className="text-white" />
                            {notiCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#E94D1A] text-white text-xs font-bold px-1 rounded-full">
                                {notiCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setMostrarConfirmacion(true)} 
                            className="text-white hover:text-red-500 cursor-pointer"
                            title="Cerrar Sesión"
                        >
                            <FaSignOutAlt size={24} />
                        </button>
                        </>
                    )}
                </div>
            </div>
           
            
        </header>
         {mostrarConfirmacion && (
                <CartelConfirmacion mensaje={"Seguro de cerrar sesion?" }
                confirmar={handleLogout} cancelar={() =>setMostrarConfirmacion(false)} /> 
            )}
     </>   
    )
}

export default Header;
<>
{/*
    <header className="text-white h-auto fixed top-0 left-0 w-full bg-[#243E73] z-50 shadow ">
            <div className="w-full flex items-center justify-between px-6 h-full">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setAbierto(!abierto)}
                        className="text-white hover:text-gray-300 cursor-pointer">
                        {abierto ? <IoCloseSharp size={28}/> : <FaBars size={28}/>}
                    </button>
                    <div className="cursor-pointer" onClick={() => navigate("/")}>
                        <img src="/logos/logo-interfacultades.png" alt="logo-interfacultades" className="h-20 ml-4" />
                    </div>
                </div>
                <div className="flex space-x-4 items-center">
                    {!estaLogueado ? (
                        <>
                            <Button text = "Registrarse" url="/register" />
                            <Button text = "Iniciar Sesión" url="/login" />
                        </>
                    ) : (
                        <>
                         <FaUserCircle size={28} className="text-white cursor-pointer" onClick={() => navigate("/perfil")}/> 
                        <button
                            onClick={() => setMostrarConfirmacion(true)} 
                            className="text-white hover:text-red-500 cursor-pointer"
                            title="Cerrar Sesión"
                        >
                            <FaSignOutAlt size={24} />
                        </button>
                        </>
                    )}
                </div>
            </div>
            {mostrarConfirmacion && (
                <CartelConfirmacion mensaje={"Seguro de cerrar sesion?" }
                confirmar={handleLogout} cancelar={() =>setMostrarConfirmacion(false)} /> 
            )}
            
        </header>
        */}
</>
