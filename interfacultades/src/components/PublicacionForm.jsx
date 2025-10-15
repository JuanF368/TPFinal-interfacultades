import React, { useState, useEffect } from "react"; 
import { TbXboxX } from 'react-icons/tb';

const PublicacionForm = ({publicacion =null, modo = 'crear', exito, setNuevo}) => {
    const [titulo, setTitulo] = useState(''); 
    const [contenido, setContenido] = useState(''); 
    const [imagenes, setImagenes] = useState([]); 
    const [imagenesExistentes, setImagenesExistentes] = useState([]);

    useEffect(() => {
        if (modo === 'editar' && publicacion) {
        setTitulo(publicacion.titulo || '');
        setContenido(publicacion.contenido || '');
        setImagenesExistentes(publicacion.imagenes || []);
        }
    }, [modo, publicacion]);

     const handleEliminarExistente = (id) => {
        setImagenesExistentes(prev => prev.filter(img => img.idimagen !== id));
    };

    const handdleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData(); 
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        imagenes.forEach(file => formData.append('imagenes', file));
        imagenesExistentes.forEach(img => formData.append('imagenesExistentes', img.idimagen));

        const token = localStorage.getItem('token');
        const url = modo === 'editar'
        ? `http://localhost:3001/perfil/publicaciones/${publicacion.idpublicacion}`
        : 'http://localhost:3001/crearPublicacion';
        const method = modo === 'editar' ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method ,
            headers: { Authorization: `Bearer ${token}`,},
            body: formData
        });
        const data = await res.json();
        console.log(data);
        if (res.ok && exito ){
            exito();
        }
        if (modo === 'crear'){
        setTitulo('');
        setContenido('');
        setImagenes([]);
        }
    }; 

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800"> {modo === 'editar' ? 'Editar Publicacion' : 'Nueva Publicacion'}</h2> 
        <form onSubmit={handdleSubmit} className="space-y-4" > 
            <input type='text' placeholder="Titulo" className="w-full border border-gray-300 p-3 rounded"
            value={titulo} onChange={e => setTitulo(e.target.value)}  required/>
            <textarea className="w-full border border-gray-300 p-3 rounded h-32 resize-none" placeholder="Contenido" value={contenido} 
             onChange={e => setContenido(e.target.value)}  required/>
            {modo === 'editar' && imagenesExistentes.length > 0 && (
            <div>
                <p className="font-medium text-gray-700">Imagenes actuales:</p>
                <div className="flex flex-wrap gap-3 mb-2">
                {imagenesExistentes.map((img, idx) => (
                    <div key={img.idimagen || img.url ||idx} className="relative">
                    <img src={`http://localhost:3001${img.url}`} className="w-100 h-60 object-cover border rounded"/>
                    <TbXboxX onClick={() => handleEliminarExistente(img.idimagen)} style={{ position: "absolute" , top:0 , right:0, fontSize: "2rem", stroke:"white", fill:"black", strokeWidth:"2"}} />
                    </div>
                ))}
                </div>
            </div>
            )}
            <label className="text-left block mb-3 font-medium text-gray-700"> Imagenes </label>
            <input type='file' className="w-full text-gray-600" multiple onChange={e => {const files = Array.from(e.target.files);
            setImagenes(files) }}/>
            <div className="flex justify-between mt-6">
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => setNuevo(false)}
                >
                    Cancelar
                </button>
               <button className="mt-4 bg-[#E94D1A] hover:bg-[#c74116] text-white font-semibold py-2 px-4 rounded cursor-pointer">
                {modo === 'editar' ? 'Guardar Cambios' : 'Publicar'}</button>
            </div>
        </form>
        </div>
    );
}

export default PublicacionForm;