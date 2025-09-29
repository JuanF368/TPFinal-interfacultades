import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../components/Input';

const Login = () => {
     
    const [uspass, setUsPass] = useState('');
    const [usmail, setusmail] = useState(''); 
    const navigate = useNavigate();

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
                alert('Login incorrecto');
            }
        })
        .catch(error=>{
            console.log('Error:' ,error);
        })
    } 
    return( 
        <div className='bg-blue-900 flex items-center justify-center min-h-screen'> 
            <form onSubmit={handdleLogin} className='bg-white p-8 rounded shadow-md w-80'>  
                <h2 className='text-center font-semibold text-gray-800 mb-8'> Login </h2>
                <Input name='usmail' value={usmail} type='email' onChange={(event) => setusmail(event.target.value)} placeHolder='Correo electronico' />
                <Input name='uspass' value={uspass} type='password' onChange={(event) => setUsPass(event.target.value)} placeHolder='Contraseña'/>
                <button className='w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 ' type='submit' > Login </button>
                <button className='w-full bg-green-500 my-5 text-white py-2 rounded hover:bg-green-600 ' onClick={registro} type='button'> Registrarse </button>
            </form>
        </div>
    ); 
}
export default Login; 