import jwt_decode from 'jwt-decode'; 

export const usuarioActual = () => {
    const token = localStorage.getItem('token');
    try {
        return jwt_decode(token);
    } catch (err){
        return null;
    }
}
 
export const isAuthenticated = () => !!getCurrentUser();