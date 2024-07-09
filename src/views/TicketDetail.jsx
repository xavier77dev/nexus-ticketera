import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading/Loading";

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      // .get(`/tickets/${id}`)
      .get(`${import.meta.env.VITE_URL}/tickets/${id}`)
      .then((response) => {
        setTicket(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ticket) {
    return <div>No se encontró el ticket.</div>;
  }
  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-blanco p-8 rounded-md xl:w-2/4 2xl:h-2/4 border-2 border-dark-azul ">

        <h2 className="text-3xl text-left font-bold mb-4">
          Información del ticket
        </h2>
        <div className="flex gap-8 py-4">
          <div className="w-1/2 text-left ">
            <div className=" flex flex-col">
              <p>Usuario:</p>
              <p className=" bg-white h-6 border-2 rounded-lg pl-4 w-5/6">
                {ticket.usuario_id}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Fecha de Creación:</p>
              <p className=" bg-white h-6 border-2 rounded-lg pl-4 w-5/6 text-sm">
                {ticket.createdAt}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Estado: </p>
              <p className=" bg-white h-6 border-2 rounded-lg pl-4 w-5/6">
                {ticket.estado}
              </p>
            </div>
          </div>
          <div className="w-1/2 text-left">
            <div className=" flex flex-col">
              <p>Ticket ID:</p>
              <p className=" bg-white h-6 border-2 rounded-lg pl-4 w-5/6">
                {ticket.id}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Fecha de Modificaión:</p>
              <p className=" bg-white h-6 border-2 rounded-lg pl-4 w-5/6 text-sm">
                {ticket.updatedAt}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Prioridad:</p>
              <p className=" bg-white h-6 border-2 rounded-lg pl-4 w-5/6">
                {ticket.prioridad}
              </p>
            </div>
          </div>
        </div>
        {/* Incidencia */}
        <div className="text-left">
          <b>Incidencia:</b>
          <div className="px-4 rounded-xl">
            <p className="bg-white border-2 rounded-lg w-full pl-4">{ticket.incidencia}</p>
          </div>
        </div>
        {/* Notas */}
        {
          ticket.estado !== "Nuevo" &&
          <div className="text-left">
            <b>Notas:</b>
            <div className=" px-4 rounded-xl">
              <p className="bg-white border-2 rounded-lg w-full pl-4"> {ticket.nota}</p>
            </div>
          </div>
        }
        {/* Diagnostico */}
        <div className="text-left">
          <b>Diagnóstico:</b>
          <div className=" h-14  px-4 rounded-xl">
            <p className="bg-white border-2 rounded-lg w-full pl-4"> {ticket.diagnostico || "-"}</p>
          </div>
        </div>

        <div className="p-4 flex justify-center items-center">
          <Link to="/ticketList" className="bg-azul mt-4 w-2/3 text-blanco px-4 py-2 rounded-md text-center font-bold transition hover:duration-200  hover:scale-110">Volver</Link>
        </div>

      </div>
    </div>
  );
};

export default TicketDetail;
