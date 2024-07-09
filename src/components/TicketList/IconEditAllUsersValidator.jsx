import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setEditTicket } from '../../redux/userSlice.js';
import editIcon from '../../assets/Icons/editIcon.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';

const IconEditAllUsersValidator = ({ ticket }) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch();
  const [operatorAssigned, setOperatorAssigned] = useState(false);

  const [userActive, setUserActive] = useState({});

  const getOperatorBusy = async () => {
    // const URL = `/usuarios/${getloggedUserLS.id}`;

    const URL = `${import.meta.env.VITE_URL}/usuarios/${getloggedUserLS.id}`;
    const { data } = await axios(URL);
    setOperatorAssigned(data.ocupado);
  }


  const handleClick = () => {
    dispatch(setEditTicket(ticket));
  }

  const getAllUsers = async () => {
    try {
      // const URL = `/usuarios/${ticket.usuario_id}`;
      const URL = `${import.meta.env.VITE_URL}/usuarios/${ticket.usuario_id}`;
      const { data } = await axios(URL);
      setUserActive(data)
    } catch (error) {
      setUserActive({})
      console.log(error.message);
    }
  }

  useEffect(() => {
    getOperatorBusy();
    getAllUsers();
  }, []);

  return (
    <div>
      {
        (getloggedUserLS.rol == "Admin" && (Object.keys(userActive).length > 0) && ticket.estado == "Nuevo" && ticket.activo)
          ?
          <Link onClick={handleClick} to={`/edit-ticket/${ticket.id}`} >
            <ModeEditIcon className='text-gray-900' fontSize='large' />
          </Link>
          :
          (getloggedUserLS.rol == "Admin" && (Object.keys(userActive).length > 0)) &&
          <ModeEditIcon className='text-gray-500' fontSize='large' />
      }


      {
        (getloggedUserLS.rol == "Operator" && ticket.estado == "Asignado" && ticket.activo && (operatorAssigned) && (Object.keys(userActive).length > 0) && (getloggedUserLS.id == ticket.operario_id))
          ?
          <Link onClick={handleClick} to={`/edit-ticket/${ticket.id}`} >
            <ModeEditIcon className='text-gray-900' fontSize='large' />
          </Link>
          :
          (getloggedUserLS.rol == "Operator" && (ticket.estado == "Nuevo") && ticket.activo && !operatorAssigned && (Object.keys(userActive).length > 0))
            ?
            <Link onClick={handleClick} to={`/edit-ticket/${ticket.id}`} >
              <ModeEditIcon className='text-gray-900' fontSize='large' />
            </Link>
            :
            (getloggedUserLS.rol == "Operator") &&
            <ModeEditIcon className='text-gray-500' fontSize='large' />
      }


      {
        (
          (getloggedUserLS.rol == "Cliente" && ticket.estado == "Nuevo" && ticket.activo)
        )
          ?
          <div>
            {
              <Link onClick={handleClick} to={`/edit-ticket-note/${ticket.id}`} >
                <i><img src={editIcon} alt="Edit Ticket" className='h-9 w-9 rounded-lg border p-1 border-dark-azul ' /></i>
              </Link>
            }
          </div>

          : (ticket.estado == "Nuevo" && getloggedUserLS.rol == "Cliente" && userActive && getloggedUserLS.activo)
            ?
            <Link onClick={handleClick} to={`/edit-ticket/${ticket.id}`} >
              <ModeEditIcon className='text-gray-900' fontSize='large' />
            </Link>
            :
            (getloggedUserLS.rol == "Cliente" && (!userActive || !ticket.activo || ticket.estado != "Nuevo")) &&
            <ModeEditIcon className='text-gray-500 ' fontSize='large' />
      }
    </div>
  )
}

export default IconEditAllUsersValidator
