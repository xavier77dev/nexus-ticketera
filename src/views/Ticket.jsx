import { Navigate } from "react-router-dom";
import CreateTicketUser from "../components/Forms/CreateTicketUser";


const Ticket = () => {


  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  return (
    <>
      {
        getloggedUserLS
          ? getloggedUserLS.rol == "Cliente" && getloggedUserLS.activo && <CreateTicketUser />
          : <Navigate to="/login" />
      }
    </>
  )
}

export default Ticket

