import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Galeria = () => {
    const [imagenes, setImagenes] = useState([]);

    const navigate = useNavigate();

    const getImagenes = async () => {
        try {
            const res = await fetch('http://localhost:3001/galeria');
            const data = await res.json();
            setImagenes(data);
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
        }
    }

    useEffect(() => {
        getImagenes();
    }, []);

    return (
        <div className='w-full px-4 py-6 text-left'>
            <h1>Galería de Imágenes</h1>
            <p>Aquí puedes ver todas las imágenes subidas por los usuarios.</p>
        </div>
    );
};

export default Galeria;