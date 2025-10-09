import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

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
                         <FaUserCircle size={28} className="text-white cursor-pointer" /> 
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
            <div className="fixed inset-0 flex items-center justify-center bg-[rgba(128,128,128,0.5)] z-50">
                <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">
                    ¿Seguro que quiere cerrar sesion?
                </h2>
                <div className="flex justify-center gap-4">
                    <button onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Si, salir
                    </button>
                    <button onClick={() => setMostrarConfirmacion(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400" >
                    Cancelar
                    </button>
                </div>
                </div>
            </div>
            )}
            
        </header>
        

    )
}

export default Header;