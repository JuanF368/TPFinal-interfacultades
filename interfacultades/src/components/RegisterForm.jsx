import React, { useState } from "react";
import Input from "./Input";
import Axios from "axios";

const RegisterForm = ({ formData, onChange, onSubmit }) => {
    return(
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-[#243E73] mb-8">
                Crear cuenta
            </h2>
            <form onSubmit={onSubmit}>
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

