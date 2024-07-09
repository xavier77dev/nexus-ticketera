import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import { deleteUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const IconDesactiveUser = ({ user }) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClick = () => {
    fnSwal();
  }

  const fnSwal = () => {
    Swal.fire({
      title: `${user.activo === true ? "Confirmar Bannear cliente" : "Confirmar Activar cliente"}`,
      text: `${user.activo === true ? `¿Desea bannear al cliente ${user.nombre} ${user.apellido}?` : `¿Desea activar al cliente ${user.nombre} ${user.apellido}?`}`,
      icon: `${user.activo === true ? "error" : "success"}`,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {

        dispatch(deleteUser({ ...user, activo: !user.activo }, navigate));
      }
      else if (response.isDenied) {
      }
    })
  }


  return (
    <div>
      {
        (user == true && user.activo === true)

          ?
          <div className='cursor-pointer' onClick={handleClick}>
            <DeleteIcon className='text-red' />
          </div>
          :
          <div className='cursor-pointer' onClick={handleClick}>
            <DeleteIcon className='text-gray-500' />
          </div>
      }
    </div>
  )
}

export default IconDesactiveUser
