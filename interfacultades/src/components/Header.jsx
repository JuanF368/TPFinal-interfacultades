import React from "react";
import Title from "./Title";
import Button from "./Button";

const Header = () => {
    return(
        <header className="sticky top-0 left-0 right-0 bg-blue-800 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                <Title text="Interfacultades"/>
                <div className="flex space-x-4">
                    <Button text = "Registrarse" url="/register" />
                    <Button text = "Iniciar Sesión" url="/login" />
                </div>
            </div>
            
        </header>
        

    )
}

export default Header;