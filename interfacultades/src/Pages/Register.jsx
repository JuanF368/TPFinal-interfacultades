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
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.nombre || !formData.apellido || !formData.email || !formData.contrasenia){
            setError("Complete todos los campos.");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email)) {
            setError("Ingrese un email válido.");
            return;
        }

        if (formData.contrasenia.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        if(formData.contrasenia !== formData.confirmarContrasenia) {
            setError("Las contraseñas no coinciden.");
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
            if (error.response?.data?.error) {
                setError(error.response.data.error);
                return; 
            }
            console.error("Error al crear usuario", error);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3A64BA] to-[#243E73]">
            <RegisterForm 
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                error={error}
            />
        </div>
    )
}

export default Register