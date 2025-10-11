import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import CartelConfirmacion from "./CartelConfirmacion";

const Header = () => {
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
        <header className="sticky top-0 left-0 right-0 bg-[#243E73] z-50 ">
            <div className="max-w-7xl mx-auto flex items-center px-6 py-3">
                
                <div className="flex space-x-4 items-center ml-auto">
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