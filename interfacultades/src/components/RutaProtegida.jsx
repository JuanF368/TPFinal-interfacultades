import { Navigate, Outlet } from "react-router";
import { isAuthenticated, usuarioActual } from "../utils/auth";

const RutaProtegida = ({roles}) => {
    const usuario = usuarioActual();
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    if(roles && !roles.includes(usuario.rodescripcion)){
        return <Navigate to="/" replace />;
    }
    return <Outlet/>
}

export default RutaProtegida;