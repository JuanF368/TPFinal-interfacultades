import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { usuarioActual } from "../utils/auth";
import { toast } from "react-toastify";

const Inscripcion = () => {
    const [estado, setEstado] = useState('');
    const [convocatoria, setConvocatoria] = useState(null); 
    const [facultades, setFacultades] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const usuario = usuarioActual(); 
    const token = localStorage.getItem('token'); 
    const [datosUsuario, setDatosUsuario] = useState({ usnombre: "", usapellido:"", usmail:"", rol:""});
    const [formData, setFormData] = useState({ idusuario: '', iddisciplina:'', idconvocatoria:'',
        idfacultad:'',fechaNac: '',  legajo:'', talleRemera:'', DNI:'', carrera:'', restriccionAlimentaria:''})
    
    useEffect(() => {
        const fetchConvocatoria = async () => {
            try { 
                const response = await fetch("http://localhost:3001/convocatoria/estado");
                const data = await response.json();
                setConvocatoria(data.convocatoria);
                setEstado(data.estado);
            } catch (error){
                console.error("Error al obtener la convocatoria:", error);
            }
        }; 
        fetchConvocatoria(); 
    }, []);
    
    useEffect(() => {
        const obtenerDatosPerfil = async() =>{
            try{
            const res = await fetch("http://localhost:3001/perfil", {
                headers: {Authorization: `Bearer ${token}` },
            }); 
            const data = await res.json();
            setDatosUsuario(data);
            } catch(error){
            console.error("Error al buscar perfil; ", error); 
            }
        }; 
        obtenerDatosPerfil();
    }, []);
    

    useEffect(()=> {
        const fetchData = async() => {
            try { 
                const [facuRes, discRes] = await Promise.all([
                    fetch("http://localhost:3001/facultades"), 
                    fetch("http://localhost:3001/disciplina")
                ]);
                const facus = await facuRes.json(); 
                const disc = await discRes.json(); 
                setFacultades(facus); 
                setDisciplinas(disc); 
            } catch(error){
                console.error("Error al cargar facultades o disciplinas:", error);
            }
        }; 
        fetchData();
    }, []); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submit = async(e) => {
        e.preventDefault(); 
        try{
            const res = await fetch('http://localhost:3001/inscripcion', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, 
                body: JSON.stringify({
                    ...formData, 
                    idusuario: usuario.idusuario, 
                    idconvocatoria: convocatoria.idconvocatoria
                })
            }); 
            const data = await res.json(); 
            console.log(formData);

            if (res.ok) {
                toast.success(data.mensaje);
                setFormData({ idusuario: '', iddisciplina:'', idconvocatoria:'',
                    idfacultad:'', legajo:'', talleRemera:'', fechaNac: '', DNI:'', carrera:'', restriccionAlimentaria:''
                });
            } else {
                toast.error(data.error);
            }
        } catch(error){
            toast.error(data.error);
            console.error('Error al enviar inscripción:', error);
        }
    }

    return ( 
        <> 
            { (convocatoria && estado ==="inscripcion de unidades academicas") ? (
                <div className="bg-white shadow-md rounded-xl p-8"> 
                    <div className='max-w-lg mx-auto mt-10 bg-white shadow-lg p-6 rounded-2xl'>
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                            Inscripcion Interfacultades UNCO 
                        </h2>
                        <form onSubmit={submit} className='space-y-4 text-left'> 
                            <div> 
                                <label className='block font-medium mb-1'> Usuario: </label>
                                <input type="text" value={`${datosUsuario.usnombre} ${datosUsuario.usapellido}`} disabled />
                            </div>
                            <div>
                                <label className='block font-medium mb-1'> Facultad:  </label>
                                <select name="idfacultad" value={formData.idfacultad} onChange={handleChange} required className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full">
                                    <option value="">Seleccionar facultad</option>
                                    {facultades.map((facu) => (
                                    <option key={facu.idfacultad} value={facu.idfacultad}>
                                        {facu.nombre}
                                    </option>
                                    ))}    
                                </select> 
                            </div>
                            <label className='block font-medium mb-1'> Carrera: </label>
                            <input type="text" name="carrera" placeholder="Carrera" value={formData.carrera}
                            onChange={handleChange} required className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full" />
                            
                            <div>
                                <label className='block font-medium mb-1'> Disciplina a la que aplica:  </label>
                                <select name="iddisciplina" value={formData.iddisciplina} onChange={handleChange} required className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full">
                                    <option value="">Seleccionar disciplina</option>
                                    {disciplinas.map((disci) => (
                                    <option key={disci.iddisciplina} value={disci.iddisciplina}>
                                        {disci.nombre}
                                    </option>
                                    ))}    
                                </select> 
                            </div>

                            <label className='block font-medium mb-1'> Legajo: </label>
                            <input type="text" name="legajo" placeholder="Legajo" value={formData.legajo}
                            onChange={handleChange} required className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full" />
                            
                            <label className='block font-medium mb-1'> DNI: </label>
                            <input type="number" name="DNI" placeholder="DNI" value={formData.DNI}
                            onChange={handleChange} required className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full" />
                            
                            <label className='block font-medium mb-1'> Fecha de nacimiento: </label>
                            <input type="date" name="fechaNac" value={formData.fechaNac}
                            onChange={handleChange} required className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full" />
                            
                            <label className='block font-medium mb-1'> Talle remera: </label>
                            <select name="talleRemera" value={formData.talleRemera} onChange={handleChange} required
                            className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full">
                                <option value="" > Seleccione un talle de remera </option>
                                <option value="XS"> XS </option>
                                <option value="S"> S </option>
                                <option value="M"> M </option>
                                <option value="L"> L </option>
                                <option value="XL"> XL </option>
                                <option value="XXL"> XXL </option>
                            </select> 
                            <label className='block font-medium mb-1'> Restriccion alimentaria (opcional): </label>
                            <input type="text" name="restriccionAlimentaria" placeholder="Restriccion alimentaria" value={formData.restriccionAlimentaria}
                            onChange={handleChange} className="border-2 border-[#E94D1A] hover:border-amber-500 rounded p-2 w-full" />
                            
                            <button type="submit" className="bg-orange-600 text-white py-2 px-4 rounded w-full hover:bg-orange-700">
                                Enviar inscripción
                            </button>
                        </form>
                    </div>
                </div>
                
            ) : ( 
               <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    No hay convocatoria abierta para inscribirse
                </h2>
            )}
        </>
    )
}

export default Inscripcion; 