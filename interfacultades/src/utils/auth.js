import { jwtDecode } from 'jwt-decode'; 

export const usuarioActual = () => {
    const token = localStorage.getItem('token');
    try {
        const decoded = jwtDecode(token);
        const tiempo = Date.now()/1000;
        if(decoded.exp < tiempo){
            localStorage.removeItem('token'); 
            return null;
        }
        return decoded;
    } catch (err){
        return null;
    }
}
 
export const isAuthenticated = () => !!usuarioActual();