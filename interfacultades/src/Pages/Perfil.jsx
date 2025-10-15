import React, { useState, useEffect } from "react";
import {usuarioActual} from "../utils/auth";
import CartaPublicacion from "../components/CartaPublicacion";
import CartelConfirmacion from "../components/CartelConfirmacion";
import PublicacionForm from "../components/PublicacionForm";
import { toast } from "react-toastify"; 

const Perfil = () => {
  const [seccion, setSeccion] = useState("perfil");
  const [publicaciones, setPublicaciones] = useState([]);
  const usuario = usuarioActual();
  const [confirmacion, setConfirmacion] = useState(false);
  const [accion, setAccion] = useState(() => ()=>{});
  const [editando, setEditando] = useState(null); 

  useEffect(() => {
    if (seccion === "publicaciones") {
      obtenerPublicaciones();
    }
  }, [seccion]);

  const obtenerPublicaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/perfil/publicaciones", {
      headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPublicaciones(data);
    } catch (err) {
      console.error("Error al obtener publicaciones", err);
    }
  };

  const eliminarPublicacion = async (idPublicacion) => {
    try { 
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3001/perfil/publicaciones/${idPublicacion}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      });
      setPublicaciones((prev) => prev.filter((p) => p.idpublicacion !== idPublicacion));
    } catch (err){ 
      console.error("Error al eliminar", err);
    }
  };

  const editarPublicacion = (idPublicacion) => {
    const publi = publicaciones.find((p) => p.idpublicacion === idPublicacion);
    if (publi) {
      setEditando(publi);
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
  };

  return (
    <div className="p-4 text-left">
      <div className="flex font-bold space-x-4 text-gray-400 border-b-2 border-gray-300 mb-3">
        <button onClick={() => {setSeccion("perfil"); setEditando(null); }}
          className={`${seccion === "perfil" ? "font-bold text-[#E94D1A] border-b-2" : ""}`}>Perfil
        </button>
        <button onClick={() => {setSeccion("publicaciones"); setEditando(null);}}
          className={`${seccion === "publicaciones" ? "font-bold  text-[#E94D1A] border-b-2" : ""}`}> Mis publicaciones
        </button>
      </div>

      <div>
        {seccion === "perfil" && (
          <div>
            <h2 className="text-xl font-semibold">Perfil</h2>
          </div>
        )}

        {seccion === "publicaciones" && (
          <div>
            {editando ? (
              <div>
                <PublicacionForm modo="editar" publicacion={editando} exito={async () => {
                await obtenerPublicaciones();
                toast.success("Publicacion editada con exito!");
                setEditando(null);
              }}
                setNuevo={setEditando}
                />
              </div>
            ) : publicaciones.length === 0 ? (
              <p>No hay publicaciones</p>
            ) : (
              publicaciones.map((publi) => (
                <CartaPublicacion key={publi.idpublicacion} publicacion={publi}
                  editar={() => editarPublicacion(publi.idpublicacion)}
                  eliminar={() => { setAccion(() => () => eliminarPublicacion(publi.idpublicacion));
                  setConfirmacion(true);
                }}
                />
              ))
            )}
            {confirmacion && (
              <CartelConfirmacion
                mensaje="Seguro de eliminar la publicacion?"
                confirmar={() => {
                  accion();
                  toast.success('Publicacion eliminada con exito!');
                  setConfirmacion(false);
                }}
                cancelar={() => setConfirmacion(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
