import { useState } from "react";
import Input from "./Input";

const FotoGaleriaForm = ({ setNuevo, exito }) => {
    const [nombre, setNombre] = useState("");
    const [archivo, setArchivo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("imagen", archivo);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:3001/galeria", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                exito();
            }else {
                console.error("Error al subir la imagen:", data);
            }
        }catch (error) {
            console.error("Error al subir la imagen:", error);
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Subir Nueva Imagen</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="nombre"
                    value={nombre}
                    type="text"
                    onChange={(e) => setNombre(e.target.value)}
                    placeHolder="Nombre de la imagen"
                />
                <input
                    name="archivo"
                    type="file"
                    className="w-full text-gray-600 cursor-pointer file:cursor-pointer"
                    onChange={(e) => setArchivo(e.target.files[0])}
                    placeHolder="Seleccionar imagen"
                />
                <div className="flex justify-between mt-6">
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                        onClick={() => setNuevo(false)}
                        >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="mt-4 bg-[#E94D1A] hover:bg-[#c74116] text-white font-semibold px-4 py-2 rounded cursor-pointer"
                    >
                        Subir Imagen
                    </button>

                </div>
            </form>
        </div>
    );
};

export default FotoGaleriaForm;