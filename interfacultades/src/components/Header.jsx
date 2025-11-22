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
        <header className="transform w-full bg-[#374d79] shadow-lg rounded-b-2xl z-30 ">
            <div className="flex items-center justify-between px-6 py-2 pr-6">

                <div className="flex items-center gap-4">

                    <button 
                        onClick={() => setAbierto(!abierto)}
                        className="text-white hover:text-gray-300 cursor-pointer md:hidden"
                    >
                        {abierto ? <IoCloseSharp size={26}/> : <FaBars size={26}/>}
                    </button>

                    <div
                        className="cursor-pointer flex items-center"
                        onClick={() => navigate("/")}
                    >
                        <img
                            src="/logos/logo-interfacultades.png"
                            alt="logo-interfacultades"
                            className="h-14"
                        />
                        <span className="ml-2 font-semibold text-xl text-white hidden sm:block">Interfacultades</span>
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
    );
};

export default Header;