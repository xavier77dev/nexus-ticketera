import { Link, useNavigate } from "react-router-dom";
import useDate from "../../helpers/useDate";
import axios from 'axios';
import Alert from '../../hooks/Alert.jsx';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import InfoTicketUserRol from "./InfoTicketUserRol.jsx";


const EditTicketOperatorAutoAssigned = ({ editTicket, msgAlert, setMsgAlert, priorityTicketCurrent, setPriorityTicketCurrent }) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    swal();
  }

  const swal = () => {
    Swal.fire({
      title: "Confirmar Aceptar Ticket",
      icon: "question",
      confirmButtonText: "Aceptar",
      showDenyButton: true,
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {
        autoAssigned();
      } else if (response.isDenied) {
      }
    })
  }

  const autoAssigned = async () => {
    const URL = `${import.meta.env.VITE_URL}/tickets/editar`;
    const URL_USUARIOS = `${import.meta.env.VITE_URL}/usuarios/editar`;
    try {
      await axios.put(URL, {
        incidencia: editTicket.incidencia, usuario_id: editTicket.usuario_id, diagnostico: editTicket.diagnostico, estado: "Asignado", prioridad: priorityTicketCurrent, operario_id: getloggedUserLS.id, activo: editTicket.activo, nota: editTicket.nota, id: editTicket.id
      });

      await axios.put(URL_USUARIOS, {
        contraseña: getloggedUserLS.contraseña, email: getloggedUserLS.email, activo: getloggedUserLS.activo,
        rol: getloggedUserLS.rol, id: getloggedUserLS.id,
        ocupado: true
      });
      navigate("/ticketList")
    } catch (error) {
      console.log(error.message);
    }
  }

  const closet = () => {
    Swal.fire({
      title: "Salir sin guardar",
      icon: "question",
      confirmButtonText: "Salir",
      showDenyButton: true,
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {
        navigate("/ticketList")
      } else if (response.isDenied) {
      }
    })
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start my-7 gap-10 flex-wrap sm:px-10">

      <InfoTicketUserRol editTicket={editTicket} rol={getloggedUserLS.rol} />

      <div className=" font-poppins flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-5 sm:p-10 relative">
        <Link onClick={closet}>
          <CloseIcon className="test-black absolute top-0 right-0" style={{ fontSize: '32.5px' }} />
        </Link>
        <div className=" flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-7 text-gray-900 text-left w-full">Editar Ticket</h3>
          {Object.keys(msgAlert).length > 0 && <Alert alert={msgAlert} />}

          <form onSubmit={handleSubmit} className="rounded-lg w-72">

            <div className='flex justify-between items-center mb-4'>
              <label htmlFor="estado" className='text-gray-900 font-semibold'>Prioridad:</label>

              <select id="estado" className='text-center p-1 border border-azul rounded-lg w-[190px] bg-white'
                value={priorityTicketCurrent} onChange={({ target }) => { setPriorityTicketCurrent(target.value); setMsgAlert({}) }}
              >
                <option value="Sin Asignar">Sin Asignar</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <button className="mt-4 bg-azul hover:bg-dark-azul text-white font-semibold py-2 px-4 rounded-lg w-full"
              type="submit">Aceptar Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTicketOperatorAutoAssigned
