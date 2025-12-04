import { useState, useEffect } from "react";
import { endpoints } from "../../api/servicios";
import { alertaGeneral } from "../../utils/alertas";

function ListadoSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  function getSolicitudes() {
    fetch(endpoints.requests)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSolicitudes(data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getSolicitudes();
  }, []);
  return (
    <div>
      <h2>Solicitudes</h2>
      {solicitudes.map((solicitud) => (
        <div>
          <p>Monto: {solicitud.amount}</p>
          <p>Motivo: {solicitud.reason}</p>
          <p>Estado: {solicitud.status}</p>
          <p>Fecha: {solicitud.date}</p>
          <div>
            <button>Apobar</button>
            <button>Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListadoSolicitudes;
