import UserEditForm from "../components/Forms/UserEdit-form"
import { Link, useParams } from "react-router-dom"
import TicketListItem from "../components/TicketList/TicketListItem";
import { getAllUsers, getUser } from "../redux/actions/userActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsByClientId } from "../redux/tourStore/ticketActions";
import Loading from "../components/Loading/Loading";
import { setModalOpen, setSelectedTicket } from "../redux/tourStore/ticketSlice";
import { ModalTicket } from "../components/utils/modalTicket";
import HeaderList from "../components/TicketList/HeaderList";
import Loading2 from "../components/Loading/loading2";
const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser")) || false;


export const UserDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser(id))
    dispatch(getTicketsByClientId(id))
    dispatch(getAllUsers)
  }, [id])

  const ticketsClient = useSelector(state => state.tickets.tickets)
  const user = useSelector(state => state.user.dataUser)
  const selectedTicket = useSelector(state => state.tickets.selectedTicket)
  const allUsers = useSelector(state => state.user.dataAllUsers)
  const modalOpen = useSelector((state) => state.tickets.modalOpen);


  const findActive = (id) => {
    const userActive = allUsers.find(user => (user.id == id && user.activo));
    return userActive;
  }

  const openTicketModal = (ticket) => {
    dispatch(setSelectedTicket(ticket));
    dispatch(setModalOpen(true));
  };

  const closeTicketModal = () => {
    dispatch(setSelectedTicket(null));
    dispatch(setModalOpen(false));
  };





  return (

    user && user.id === id ? <Loading2 />
      :

      <div className=" flex justify-center items-start items-top">

        <UserEditForm id={id} />
        {(user.rol !== "Admin" && user.rol !== "Operator" && getloggedUserLS.id !== user.id) && (<div className=" flex flex-col justify-center items-center ">
          <div className=" flex flex-col justify-start items-center my-[5%] bg-blanco p-6 rounded-lg shadow-md ml-[5%] h-[36rem] w-[36rem] mt-[1.6rem] font-poppins">
            <h3 className="flex text-[1.8rem] font-bold ml-[1.5rem] text-left mb-[0.8rem] mt-[1.3rem]">Tickets</h3>
            <div className="max-h-[400px] overflow-y-auto">
              <table width="100%">
                <thead >
                  <HeaderList />
                </thead>
                <tbody>
                  {ticketsClient && ticketsClient.length === 0 ? (
                    <tr>
                      <td>No hay tickets</td>
                    </tr>

                  ) : (
                    ticketsClient.map((ticket) => (
                      <TicketListItem
                        ticket={ticket}
                        key={ticket.id}
                        active={findActive(ticket.usuario_id)}
                        openTicketModal={openTicketModal}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>)}
        {selectedTicket && modalOpen && <ModalTicket selectedTicket={selectedTicket} />}
      </div>
  )

}
