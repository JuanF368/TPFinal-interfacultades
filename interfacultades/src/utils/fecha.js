export const fecha = (fechaI) => { 

  if (!fechaI) return "";
  const fecha = new Date(fechaI);
  const opciones = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  };

  return fecha.toLocaleString("es-ES", opciones);
  
};

//fecha en dd/mm/aa  hh/mm
