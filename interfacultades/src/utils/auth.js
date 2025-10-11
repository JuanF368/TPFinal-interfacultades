import { jwtDecode } from 'jwt-decode'; 

export const usuarioActual = () => {
    const token = localStorage.getItem('token');
    try {
        return jwtDecode(token);
    } catch (err){
        return null;
    }
}
 
export const isAuthenticated = () => !!usuarioActual();