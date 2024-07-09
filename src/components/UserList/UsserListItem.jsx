import useDate from "../../helpers/useDate.js";

import moreIcon from "../../assets/Icons/moreIcon.svg";


import IconEditUsers from "./IconEditUsers.jsx";
import IconDesactiveUser from "./IconDesactiveUser.jsx";



const UsserListItem = ({ user, openTicketModal, active }) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));

  const handleOpenModal = () => {
    openTicketModal(user);
  };
  return (
    <tr className="my-2 font-poppins border-b-[1px] border-azul rounded-b-lg h-10 text-center">

      <td>
        <p>{user.id}</p>
      </td>

      {getloggedUserLS.rol !== "Cliente" && (
        <td>
          {user.nombre} {user.apellido}
        </td>
      )}
      {getloggedUserLS.rol !== "Cliente" && (

        <td>
          {user.email}
        </td>

      )}

      <td>
        <p className={`mx-[1px] rounded-md ${user.activo === true ? "bg-green" : "bg-red"}`}>
          {user.activo ? "Activo" : "Inactivo"}
        </p>
      </td>

      <td>
        <p className={`mx-[1px] rounded-md ${user.prioridad === "Sin Asignar" ? "bg-naranja" :
          user.rol === "Cliente" ? "bg-celeste" :
            user.rol === "Operator" ? "bg-green" :
              user.rol === "Admin" ? "bg-naranja" : ""
          }`}>{user.rol}</p>
      </td>

      <td>
        <p>{user.compania_id}</p>
      </td>

      <td>
        <p>{useDate(new Date(user.createdAt))}</p>
      </td>

      <td>
        <IconEditUsers user={user} />
        {/* <button className="bg-white h-9 w-9 flex items-center justify-center border border-dark-azul rounded-lg cursor-pointer " onClick={handleOpenModal}>
          <img src={moreIcon} alt="" />
        </button> */}
      </td>
      <td>
        <IconDesactiveUser user={user} />
      </td>
    </tr>
  );
};

export default UsserListItem;
