import { useEffect, useState } from 'react';
import FotoGaleriaForm from '../components/FotoGaleriaForm';
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Galeria = () => {
    const [imagenes, setImagenes] = useState([]);
    const [nuevo, setNuevo] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [indiceActual, setIndiceActual] = useState(0);

    const user = localStorage.getItem('token');

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

    const cambiarImagen = (direccion) => {
        if(imagenes.length === 0) return;
        let nuevoIndice;

        if(direccion === 'izquierda') {
            nuevoIndice = indiceActual === 0 ? imagenes.length - 1 : indiceActual - 1;
        }else{
            nuevoIndice = indiceActual === imagenes.length - 1 ? 0 : indiceActual + 1;
        }

        setIndiceActual(nuevoIndice);
        setImagenSeleccionada(imagenes[nuevoIndice]);
    }

    return (
        <div className='w-full px-4 py-6 text-left'>
            <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Galería de Imágenes</h1>
            {nuevo ? (
                <FotoGaleriaForm 
                    setNuevo={setNuevo} 
                    exito={() => {
                        setNuevo(false);
                        toast.success("Imagen agregada con exito!");
                        getImagenes();
                    }}
                />
            ) : (
                <div className='w-full mx-auto bg-blue-50 p-6 rounded-2xl '>
                    <h1 className='font-bold mb-4'>Imágenes</h1>
                    <hr className='mb-6' />
                    {imagenes.length === 0 ? (
                        <p>No hay imágenes en la galería.</p>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                            {imagenes.map((img, index) => (
                                <div
                                    key={img.idimagen}
                                    className='bg-white shadow-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-200'
                                    onClick ={() => {
                                        setImagenSeleccionada(img);
                                        setIndiceActual(index);
                                    }}
                                >
                                    <img src={`http://localhost:3001${img.ruta}`} alt={img.nombre} className='w-full h-48 object-cover'/>
                                    <div className='p-2 text-center text-sm font-medium text-gray-700'>
                                        {img.nombre}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            { user && !nuevo && (
                <button onClick={() => setNuevo(true)}
                    className='fixed bottom-6 right-6 bg-[#E94D1A] text-white px-5 py-3 rounded-md shadow-lg hover:bg-[#c03d12] cursor-pointer'>
                    Nueva Imagen
                </button>
            )}

            {imagenSeleccionada && (
                <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
                    <button
                        onClick={() => setImagenSeleccionada(null)}
                        className='absolute top-6 right-6 text-white hover:text-gray-300 cursor-pointer'
                    >
                        <RxCross2 size={30}/>
                    </button>
                    <button
                        onClick={() => cambiarImagen('izquierda')}
                        className='absolute left-6 text-white hover:text-gray-300 cursor-pointer'
                    >
                        <FaChevronLeft size={40}/>
                    </button>
                    <img
                        src={`http://localhost:3001${imagenSeleccionada.ruta}`}
                        alt={imagenSeleccionada.nombre}
                        className='max-w-3xl max-h-[80vh] object-contain rounded-lg shadow-lg'
                    />
                    <button
                        onClick={() => cambiarImagen('derecha')}
                        className='absolute right-6 text-white hover:text-gray-300 cursor-pointer'
                    >
                        <FaChevronRight size={40}/>
                    </button>
                </div>
            )}

        </div>
    );
};

export default Galeria;