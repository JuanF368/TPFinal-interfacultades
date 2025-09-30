import React from "react";
import Input from "./Input";

const RegisterForm = ({ formData, onChange, onSubmit, error }) => {
    return(
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-[#243E73] mb-8">
                Crear cuenta
            </h2>
            {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                    {error}
                </div>
            )}
            <form onSubmit={onSubmit} noValidate>
                <Input
                    name="nombre"
                    value={formData.nombre}
                    type="text"
                    onChange={onChange}
                    placeHolder={"Nombre"}
                />
                <Input
                    name="apellido"
                    value={formData.apellido}
                    type="text"
                    onChange={onChange}
                    placeHolder={"Apellido"}
                />
                <Input
                    name="email"
                    value={formData.email}
                    type="email"
                    onChange={onChange}
                    placeHolder={"Mail"}
                />
                <Input
                    name="contrasenia"
                    value={formData.contrasenia}
                    type="password"
                    onChange={onChange}
                    placeHolder={"Contraseña"}
                />
                <Input
                    name="confirmarContrasenia"
                    value={formData.confirmarContrasenia}
                    type="password"
                    onChange={onChange}
                    placeHolder={"Confirmar contraseña"}
                />
                <button
                    type="submit"
                    className="bg-[#243E73] text-white py-2 px-4 rounded hover:bg-[#3A64BA] transition duration-300 cursor-pointer"
                >
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default RegisterForm;

