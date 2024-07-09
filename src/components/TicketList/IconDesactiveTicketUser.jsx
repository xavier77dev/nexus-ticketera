import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setSearchTickets } from '../../redux/tourStore/ticketSlice';
import { GetTicketsUser } from '../../views/getTicketsUser';

const IconDesactiveTicketUser = ({ ticket }) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const handleClick = () => {
    fnSwal();
  }

  const fnSwal = () => {
    Swal.fire({
      title: "Confirmar para Eliminar Ticket",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {
        deleteTicket();
      }
      else if (response.isDenied) {
      }
    })
  }


  const getData = async (idUser) => {
    const data = await GetTicketsUser(idUser).then(response => response);
    dispatch(setSearchTickets(data));
  }


  const deleteTicket = async () => {
    try {
      const URL = `${import.meta.env.VITE_URL}/tickets/editar`
      await axios.put(URL,
        {
          estado: "Finalizado", prioridad: ticket.prioridad, incidencia: ticket.incidencia, diagnostico: "",
          usuario_id: ticket.usuario_id, operario_id: ticket.operario_id, activo: false, nota: "", id: ticket.id
        });

      getData(getloggedUserLS.id);
      navigate("/ticketList");
      return;
    } catch (error) {
    }
  }
  return (
    <>
      {
        (ticket.estado == "Nuevo" && getloggedUserLS.activo) &&
          (getloggedUserLS.rol !== "Admin" && getloggedUserLS.rol !== "Operator")
          ?
          <div className='cursor-pointer' onClick={handleClick}>
            <DeleteIcon className='text-red' />
          </div>
          :
          (getloggedUserLS.rol !== "Admin" && getloggedUserLS.rol !== "Operator") &&
          <DeleteIcon className='text-gray-500' />
      }
    </>
  )
}

export default IconDesactiveTicketUser
