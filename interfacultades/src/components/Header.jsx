import React, { useEffect, useState } from "react";
import Title from "./Title";
import Button from "./Button";

const Header = () => {
    const [estaLogueado, setEstaLogueado] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setEstaLogueado(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setEstaLogueado(false);
    };

    return(
        <header className="sticky top-0 left-0 right-0 bg-blue-800 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                <Title text="Interfacultades"/>
                <div className="flex space-x-4">
                    {!estaLogueado ? (
                        <>
                            <Button text = "Registrarse" url="/register" />
                            <Button text = "Iniciar Sesión" url="/login" />
                        </>
                    ) : (
                        <>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Cerrar Sesión
                        </button>
                        </>
                    )}
                </div>
            </div>
            
        </header>
        

    )
}

export default Header;