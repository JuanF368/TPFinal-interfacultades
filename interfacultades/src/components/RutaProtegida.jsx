import { Navigate, Outlet } from "react-router";
import { isAuthenticated, usuarioActual } from "../utils/auth";
import socket from "../utils/socket";
import { useEffect } from "react";

const RutaProtegida = ({roles}) => {
    const usuario = usuarioActual();
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    if(roles && !roles.includes(usuario.rodescripcion)){
        return <Navigate to="/" replace />;
    }

    useEffect(() => {
      socket.connect();
      socket.emit("registerUser", usuario.idusuario);
      return () => socket.disconnect();
    }, []);

    return <Outlet/>
}

export default RutaProtegida;