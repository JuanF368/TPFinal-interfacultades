import React, { useState } from "react"; 

const PublicacionForm = () => {
    const [titulo, setTitulo] = useState(''); 
    const [contenido, setContenido] = useState(''); 
    const [imagenes, setImagenes] = useState([]); 

    const handdleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData(); 
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        imagenes.forEach(file => formData.append('imagenes', file));

        const res = await fetch('http://localhost:3001/crearPublicacion', {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,},
            body: formData
        });
        const data = await res.json();
        console.log(data);
        setTitulo('');
        setContenido('');
        setImagenes([]);
    }; 

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Nueva Publicacion</h2> 
        <form onSubmit={handdleSubmit} className="space-y-4" > 
            <input type='text' placeholder="Titulo" className="w-full border border-gray-300 p-3 rounded"
            value={titulo} onChange={e => setTitulo(e.target.value)}  required/>
            <textarea className="w-full border border-gray-300 p-3 rounded h-32 resize-none" placeholder="Contenido" value={contenido} 
             onChange={e => setContenido(e.target.value)}  required/>
            <label className="text-left block mb-3 font-medium text-gray-700"> Imagenes </label>
            <input type='file' className="w-full text-gray-600" multiple onChange={e => {const files = Array.from(e.target.files);
            setImagenes(files) }}/>
            <div className="text-right">
                <button className="bg-[#E94D1A] hover:bg-[#c74116] text-white font-semibold py-2 px-4 rounded transition duration-200">Publicar</button>
            </div>
        </form>
        </div>
    );
}

export default PublicacionForm;