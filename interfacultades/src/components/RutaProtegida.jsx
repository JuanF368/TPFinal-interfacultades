import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../utils/auth";

const RutaProtegida = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>
}

export default RutaProtegida;