import React from "react";

const TicketModal = ({ selectedTicket, closeModal }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-blanco p-8 rounded-md xl:w-2/4 max-h-[85%] border-2 border-dark-azul overflow-y-auto">
        <button onClick={closeModal} className="absolute top-0 right-0 m-4">
          &times;
        </button>
        <h2 className="text-3xl text-left font-bold mb-4">
          Información del ticket
        </h2>
        <div className="flex gap-8 py-4">
          <div className="w-1/2 text-left ">
            <div className=" flex flex-col">
              <p>Usuario:</p>
              <p className=" bg-white h-7 border-2 rounded-lg pl-4 w-5/6">
                {selectedTicket.usuario_id}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Fecha de Creación:</p>
              <p className=" bg-white h-7 border-2 rounded-lg pl-4 w-5/6 text-sm">
                {selectedTicket.createdAt}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Estado: </p>
              <p className={`h-7 border-2 rounded-lg pl-4  w-5/6 ${
                selectedTicket.estado === "Nuevo"
                  ? "bg-naranja"
                  : selectedTicket.estado === "Asignado"
                  ? "bg-green"
                  : selectedTicket.estado === "Finalizado"
                  ? "bg-celeste"
                  : selectedTicket.estado === "Trabajando"
                  ? "bg-red"
                  : ""
              }`}>
                
                {selectedTicket.estado}
              </p>
            </div>
            {/* Verificar si hay un operario asignado antes de mostrar la información */}
            {selectedTicket.operario_id && (
              <div className="flex flex-col">
                <p>ID de Operario Asignado:</p>
                <p className="bg-white h-7 border-2 rounded-lg pl-4 w-5/6">
                  {selectedTicket.operario_id}
                </p>
              </div>
            )}
          </div>
          <div className="w-1/2 text-left">
            <div className=" flex flex-col">
              <p>Ticket ID:</p>
              <p className=" bg-white h-7 border-2 rounded-lg pl-4 w-5/6">
                {selectedTicket.id}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Fecha de Modificaión:</p>
              <p className=" bg-white h-7 border-2 rounded-lg pl-4 w-5/6 text-sm">
                {selectedTicket.updatedAt}
              </p>
            </div>
            <div className=" flex flex-col">
              <p>Prioridad:</p>
              <p className={`h-7 border-2 rounded-lg pl-4 w-5/6 ${
                selectedTicket.prioridad === "Sin Asignar"
                ? "bg-naranja"
                : selectedTicket.prioridad === "Baja"
                ? "bg-green"
                : selectedTicket.prioridad === "Media"
                ? "bg-yellow"
                : selectedTicket.prioridad === "Alta"
                ? "bg-red"
                : ""
              }`}
              >
                {selectedTicket.prioridad}
              </p>
            </div>
          </div>
        </div>
        {/* Incidencia */}
        <div className="text-left">
          <b>Incidencia:</b>
          <div className="px-4 rounded-xl">
            <p className="bg-white border-2 rounded-lg w-full pl-4">
              {selectedTicket.incidencia}
            </p>
          </div>
        </div>
        {/* Notas */}
        {selectedTicket.nota && selectedTicket.nota.trim() !== "" && (
          <div className="text-left">
            <b>Notas:</b>
            <div className="px-4 rounded-xl">
              <p className="bg-white border-2 rounded-lg w-full pl-4">
                {selectedTicket.nota}
              </p>
            </div>
          </div>
        )}
        {/* Diagnóstico */}
        <div className="text-left">
          <b>Diagnóstico:</b>
          <div className="px-4 rounded-xl">
            <p className="bg-white border-2 rounded-lg w-full pl-4">
              {selectedTicket.diagnostico || "-"}
            </p>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="bg-azul mt-4 w-2/3 text-blanco px-4 py-2 rounded-md transition hover:duration-200 hover:scale-110"
        >
          Cerrar
        </button>
        {/* Botón para cerrar el modal */}
      </div>
    </div>
  );
};

export default TicketModal;
