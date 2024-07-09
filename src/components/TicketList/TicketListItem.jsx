import React from "react";
import useDate from "../../helpers/useDate.js";
import IconDesactiveTicketUser from "./IconDesactiveTicketUser";
import IconEditAllUsersValidator from "./IconEditAllUsersValidator";
import moreIcon from "../../assets/Icons/moreIcon.svg";

const TicketListItem = ({ ticket, openTicketModal, active }) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));

  const handleOpenModal = () => {
    openTicketModal(ticket);
  };

  return (
    <tr className="my-2 flex justify-between font-poppins border-b-[1px] border-azul rounded-b-lg h-10 px-7">
      <td className="flex justify-center items-center">{ticket.id}</td>
      <td className="flex justify-center items-center">
        <p
          className={`rounded-md flex text-center items-center justify-center w-28 ${ticket.estado === "Nuevo"
            ? "bg-naranja"
            : ticket.estado === "Asignado"
              ? "bg-green"
              : ticket.estado === "Finalizado"
                ? "bg-celeste"
                : ticket.estado === "Trabajando"
                  ? "bg-red"
                  : ""
            }`}
        >
          {ticket.estado}
        </p>
      </td>
      {getloggedUserLS.rol !== "Cliente" && (
        <td className=" flex item-center justify-center">
          <p className="bg-white w-12 h-8 text-center flex justify-center items-center border rounded-lg">
            {ticket.usuario_id}
          </p>
        </td>
      )}

      <td className="flex justify-center items-center">
        <p
          className={`rounded-md flex text-center items-center justify-center w-28 ${ticket.prioridad === "Sin Asignar"
            ? "bg-naranja"
            : ticket.prioridad === "Baja"
              ? "bg-green"
              : ticket.prioridad === "Media"
                ? "bg-yellow"
                : ticket.prioridad === "Alta"
                  ? "bg-red"
                  : ""
            }`}
        >
          {ticket.prioridad}
        </p>
      </td>

      <td className=" flex justify-center items-center">
        <p>{useDate(new Date(ticket.createdAt))}</p>
      </td>

      <td className="flex justify-around items-center">
        <IconEditAllUsersValidator ticket={ticket} />
        <button
          className="bg-white h-9 w-9 flex items-center justify-center border border-dark-azul rounded-lg cursor-pointer "
          onClick={handleOpenModal}
        >
          <img src={moreIcon} alt="" />
        </button>
        <IconDesactiveTicketUser ticket={ticket} />
      </td>
    </tr>
  );
};

export default TicketListItem;
