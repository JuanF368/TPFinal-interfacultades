import { fecha } from "../utils/fecha";

const Notificaciones = ({ notificaciones }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mis notificaciones</h2>

      {notificaciones.length === 0 ? (
        <p> No hay notificaciones nuevas </p>
      ) : (
        notificaciones.map((n) => (
          <div key={n.idnotificacion} className="p-3 bg-white shadow rounded mt-2">
            <h2>{n.mensaje}</h2>
            <p className="text-gray-500">{fecha(n.fecha)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notificaciones;
