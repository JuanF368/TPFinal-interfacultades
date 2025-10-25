import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router";
import CartelConfirmacion from "./CartelConfirmacion";
import { IoCloseSharp } from 'react-icons/io5';

const Header = ({abierto, setAbierto}) => {
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
                            className="text-white hover:text-red-500"
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
        

    )
}

export default Header;