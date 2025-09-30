import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../components/Input';

const Login = () => {
     
    const [uspass, setUsPass] = useState('');
    const [usmail, setusmail] = useState(''); 
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const registro = () => {
        navigate('/register');
    }
    const handdleLogin = (e) => {
        e.preventDefault(); 
        const data = {
            usmail : usmail, 
            uspass : uspass, 
        }
        fetch('http://localhost:3001/login', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result =>{
            if(result.token){
                localStorage.setItem('token', result.token)
                navigate('/', { state: { mensaje: '¡Bienvenido!' } });
            } else {
                setError('Usuario o contraseña incorrectos. Intentalo de nuevo.');
            }
        })
        .catch(error=>{
            console.log('Error:' ,error);
        })
    } 
    return( 
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3A64BA] to-[#243E73]'>
            <form onSubmit={handdleLogin} className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>  
                <h2 className='text-2xl text-center font-bold text-[#243E73] mb-8'> Login </h2>
                {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                    {error}
                </div>
                )}
                <Input name='usmail' value={usmail} type='email' onChange={(event) => setusmail(event.target.value)} placeHolder='Correo electronico' />
                <Input name='uspass' value={uspass} type='password' onChange={(event) => setUsPass(event.target.value)} placeHolder='Contraseña'/>
                <button className='w-full bg-[#243E73] text-white py-2 rounded hover:bg-[#3A64BA] transition duration-300 cursor-pointer' type='submit' > Login </button>
                <button className='w-full bg-green-700 my-5 text-white py-2 rounded hover:bg-green-600 transition duration-300 cursor-pointer' onClick={registro} type='button'> Registrarse </button>
            </form>
        </div>
    ); 
}
export default Login; 