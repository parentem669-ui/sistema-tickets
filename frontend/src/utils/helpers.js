export const formatearFecha = (fechaISO) => {
  if (!fechaISO) return '';
  const fecha = new Date(fechaISO.endsWith('Z') ? fechaISO : `${fechaISO}Z`);
  return fecha.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};