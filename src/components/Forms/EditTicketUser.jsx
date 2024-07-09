import { useEffect, useRef, useState} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import useDate from "../../helpers/useDate.js";
import axios from "axios";
import Swal from 'sweetalert2';
import Alert from "../../hooks/Alert.jsx";
import CloseIcon from '@mui/icons-material/Close';
import InfoTicketUserRol from "./InfoTicketUserRol.jsx";

const EditTicketUser = () => {
  const [msgAlert, setMsgAlert] = useState({});
  const {id: idTicket} = useParams();
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const textRef = useRef(null);
  const URL = "/tickets/editar";

  const {editTicket} = useSelector(state => state.user); 
  const {id, usuario_id, incidencia, diagnostico, estado, prioridad, operario_id, createdAt, updatedAt} = editTicket;

  const [incidence, setIncidence] = useState(incidencia);

  useEffect(() => {
    textRef.current.select();
    (!((getloggedUserLS.id == usuario_id )&& (idTicket == id))) && navigate("/ticketList");
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (incidence.trim() === "") {
      return setMsgAlert({msg: "Introducir el texto", error: true})
    }

    else if (incidence.trim() == incidencia.trim()) {
      return setMsgAlert({msg: "Incidencia ya existente no modificable", error: true})
    }
 
    editTicketCurrent();
  }

  const editTicketCurrent = () => {
    Swal.fire({
      title: "Confirmar Edición de Ticket",
      icon: "question",
      confirmButtonText: "Confirmar",
      showDenyButton: true,
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {
        axiosEdit();
      } else if (response.isDenied) {
      }
    }) 
  }

  const axiosEdit = async () => {
    try { 
      await axios.put(URL, { incidencia: incidence, usuario_id: getloggedUserLS.id,  diagnostico: "", estado: "Nuevo", prioridad: "Sin Asignar", operario_id: null, activo: true, nota: "", id
    });
    setIncidence("");      
    navigate(`/ticketDetail/${id}`);
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
    <>
      { 
      estado == "Nuevo" &&
      <div className=" flex flex-col sm:flex-row justify-center items-center sm:items-start my-7 gap-10 flex-wrap sm:px-10">  

        <InfoTicketUserRol editTicket={editTicket} rol={getloggedUserLS.rol}/>

        <div className="font-poppins flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-5 sm:p-10 relative">
          <Link onClick={closet}>
            <CloseIcon className="test-black absolute top-0 right-0" style={{ fontSize: '32.5px' }}/>
          </Link>

            <h3 className="text-2xl font-bold mb-7 text-gray-900 text-left w-full">Editar Ticket</h3>

            <form onSubmit={handleSubmit} className="rounded-lg w-72">
            {msgAlert.msg && <Alert alert={msgAlert}/>}

              <div className="flex flex-col m-1 text-left w-full">
                <label className="block text-left text-gray-900 font-semibold mb-2 " htmlFor="texto">Incidencia:</label>
                <textarea className="h-[200px] sm:h-[165px] p-2 border border-gray-400 resize-none rounded-md  focus:border-azul focus:outline-none text-[15px] text-gray-900" 
                id="texto" placeholder="Ingresar Incidencia"
                  onChange={({target}) => {setIncidence(target.value.trimStart().slice(0, 250)); setMsgAlert({})}} value={incidence}
                  ref={textRef}
                ></textarea>
                <p className="text-[13px] p-1 text-gray-700">max 250 caracteres</p>
              </div>

              <button className="mt-4 bg-azul hover:bg-dark-azul text-white font-semibold py-2 px-4 rounded-lg w-full"
                type="submit">Editar
              </button>
            </form>
        </div>
    </div>
      }
    </>
  )
}

export default EditTicketUser
