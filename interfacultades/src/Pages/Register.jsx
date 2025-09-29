import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm"
import Axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();
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
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.contrasenia !== formData.confirmarContrasenia) {
            console.log("Las contraseñas o coinciden");
            return;
        }

        if(!formData.nombre || !formData.apellido || !formData.email || !formData.contrasenia){
            console.log("Por favor, complete todos los campos");
            return;
        }

        addUsuario();
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
             //navigate('/', { state: { mensaje: `¡Bienvenido ${formData.nombre}, te registraste con exito!` } });
             navigate('/login'); //para que se tenga que loguear obligatoriamente para el token
        })
        .catch(error => {
            console.error("Error al crear usuario", error);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3A64BA] to-[#243E73]">
            <RegisterForm 
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Register