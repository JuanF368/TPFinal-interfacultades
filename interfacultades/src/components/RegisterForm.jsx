import React, { useState } from "react";
import Input from "./Input";
import Axios from "axios";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contrasenia: "",
        confirmarContrasenia: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.contrasenia !== formData.confirmarContrasenia) {
            console.log("Las contraseñas no coinciden");
            return;
        }

        if(!formData.nombre || !formData.apellido || !formData.email || !formData.contrasenia) {
            console.log(formData.nombre, formData.apellido, formData.email, formData.contrasenia, "a");
            console.log("Por favor, complete todos los campos");
            return;
        }

        addUsuario();
        console.log("Formulario enviado", formData);
    }

    const addUsuario = () => {
        Axios.post("http://localhost:3001/crearUsuario",{
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          contrasenia: formData.contrasenia
        })
        .then(response => {
          console.log("Usuario creado", response.data);
        })
        .catch(error => {
          console.error("Error al crear usuario", error);
        });
    }

    return(
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Crear cuenta
            </h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name="nombre"
                    value={formData.nombre}
                    type="text"
                    onChange={handleChange}
                    placeHolder={"Nombre"}
                />
                <Input
                    name="apellido"
                    value={formData.apellido}
                    type="text"
                    onChange={handleChange}
                    placeHolder={"Apellido"}
                />
                <Input
                    name="email"
                    value={formData.email}
                    type="email"
                    onChange={handleChange}
                    placeHolder={"Mail"}
                />
                <Input
                    name="contrasenia"
                    value={formData.contrasenia}
                    type="password"
                    onChange={handleChange}
                    placeHolder={"Contraseña"}
                />
                <Input
                    name="confirmarContrasenia"
                    value={formData.confirmarContrasenia}
                    type="password"
                    onChange={handleChange}
                    placeHolder={"Confirmar contraseña"}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default RegisterForm;

