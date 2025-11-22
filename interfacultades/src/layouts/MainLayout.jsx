import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import { usuarioActual, isAuthenticated } from "../utils/auth";
import socket from "../utils/socket"; 
import { toast } from 'react-toastify';

const MainLayout = () => {
  const [abierto, setAbierto] = useState(false);
  const [notiCount, setNotiCount] = useState(0);

  useEffect(() => {
    const cargarNotificaciones = async () => {
      if (!isAuthenticated()) {
        return;
      }

      const usuario = usuarioActual();
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/notificaciones/${usuario.idusuario}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      const noLeidas = data.filter(n => !n.leida).length;
      setNotiCount(noLeidas);
    };
    cargarNotificaciones();
  }, []); 

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    const usuario = usuarioActual();
    socket.connect();
    socket.emit("registerUser", usuario.idusuario);
    socket.on("rolActualizado", (data) => {
      setNotiCount((prev) => prev + 1); 
      toast.info(data.mensaje);
    });

    return () => {
      socket.off("rolActualizado");
    };

  }, []);

  useEffect(() => {
    const reset = () => setNotiCount(0);
    window.addEventListener("notificacionesLeidas", reset);
    return () => window.removeEventListener("notificacionesLeidas", reset);
  }, []);


  return (
    <div className="min-h-screen">
      <SideBar abierto={abierto} setAbierto={setAbierto}/>
      <div className={`transition-all duration-300 fixed top-0 right-0 z-30 ${abierto ? "md:left-25" : "left-0 md:left-25"} `}>
        <Header abierto={abierto} setAbierto={setAbierto} notiCount={notiCount}/>
      </div>
      <div className={`pt-20 transition-all duration-300 ${abierto ? "md:pl-25" : "pl-0 md:pl-25"}`}>
        <main className='min-h-screen p-4'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
