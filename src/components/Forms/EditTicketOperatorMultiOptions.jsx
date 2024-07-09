import { Link, useNavigate } from "react-router-dom";
import useDate from "../../helpers/useDate";
import axios from 'axios';
import Alert from '../../hooks/Alert.jsx';
import Swal from 'sweetalert2';
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import InfoTicketUserRol from "./InfoTicketUserRol.jsx";


const EditTicketOperatorMultiOptions = ({editTicket, msgAlert, setMsgAlert, priorityTicketCurrent, setPriorityTicketCurrent}) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const [status, setStatus] = useState(editTicket.estado);
  const [diagnosis, setDiagnosis] = useState(editTicket.diagnostico ?? "");

  const textRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priorityTicketCurrent == editTicket.prioridad && status == editTicket.estado && diagnosis.trim() == (editTicket.diagnostico ?? "")) {
      return setMsgAlert({msg: "No hay cambio alguno", error: true});
    }

    swal();
  } 
  
  const swal = () => {
    Swal.fire({
      title: status == "Asignado" ? "Confirmar Editar Ticket" 
        : status == "Nuevo" ? "Confirmar Dejar Ticket"
          : status == "Finalizado" && `Confirma Finalizar Ticket`,
      icon: "question",
      confirmButtonText: "Aceptar",
      showDenyButton: true, 
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {
        (status == "Nuevo") 
        ? liveTicket() 
        : (status == "Asignado") 
          ? editTicketAssigned()
          : (status == "Finalizado") && ticketFinished(); 
      } else if (response.isDenied) {
      }
    }) 
  }

  const editTicketAssigned = async () => {
    const URL = "/tickets/editar";
    try { 
        await axios.put(URL, { 
          incidencia: editTicket.incidencia, usuario_id:editTicket.usuario_id, operario_id: getloggedUserLS.id, activo: editTicket.activo, 
          nota: editTicket.nota, id: editTicket.id,
          diagnostico: diagnosis, estado: status, prioridad: priorityTicketCurrent
      });
      
      navigate("/ticketList");
    } catch (error) {
      console.log(error.message);
    }
  }

  const ticketFinished = async () => {
    const URL = "/tickets/editar";
    const URL_USUARIOS = `/usuarios/editar/`;
    try { 
        await axios.put(URL, { 
          incidencia: editTicket.incidencia, nota: editTicket.nota, id: editTicket.id, 
          usuario_id: editTicket.usuario_id, operario_id: editTicket.operario_id, prioridad: editTicket.prioridad, 
          diagnostico: diagnosis, estado: "Finalizado", activo: false, 
      });
      
      await axios.put(URL_USUARIOS,{
        contraseña: getloggedUserLS.contraseña, email: getloggedUserLS.email, activo: getloggedUserLS.activo,
        rol: getloggedUserLS.rol, id: getloggedUserLS.id,
        ocupado: false
      });
      navigate("/ticketList");

    } catch (error) {
      console.log(error.message);
    }
  }

  const liveTicket = async () => {
    const URL = "/tickets/editar";
    const URL_USUARIOS = "/usuarios/editar";
    try { 
        await axios.put(URL, { 
          incidencia: editTicket.incidencia, activo: editTicket.activo, nota: editTicket.nota, id: editTicket.id, 
          usuario_id: editTicket.usuario_id,
          diagnostico: diagnosis, estado: "Nuevo", prioridad: "Sin Asignar",   operario_id: null
      });
      
      await axios.put(URL_USUARIOS,{
        contraseña: getloggedUserLS.contraseña, email: getloggedUserLS.email, activo: getloggedUserLS.activo,
        rol: getloggedUserLS.rol, id: getloggedUserLS.id,
        ocupado: false
      });
      navigate("/ticketList");

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    textRef.current.select();
  }, []);

  useEffect(() => {
    if (status == "Nuevo") {
      setPriorityTicketCurrent("Sin Asignar");
    } else {
      setPriorityTicketCurrent(editTicket.prioridad);
    }
  }, [status]);

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
     
      <InfoTicketUserRol editTicket={editTicket} rol={getloggedUserLS.rol}/>

      <div className="font-poppins flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-5 sm:p-10 relative">
          <Link onClick={closet}>
            <CloseIcon className="test-black absolute top-0 right-0" style={{ fontSize: '32.5px' }}/>
          </Link>
        <div className=" flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-7 text-gray-900 text-left w-full">Editar Ticket</h3>
          {Object.keys(msgAlert).length > 0 && <Alert alert={msgAlert}/>}

          <form  onSubmit={handleSubmit} className="rounded-lg w-72">

            <div className=' flex justify-between items-center mb-4'>
              <label htmlFor="estado" className='text-gray-900 font-semibold'>Estado:</label>

              <select id="estado" className='text-center py-[1px] border border-azul rounded-lg w-[190px] bg-white' 
              value={status} onChange={({target}) => { setStatus(target.value); setMsgAlert({})}}
              >
                <option value="Finalizado">Finalizado</option>  
                <option value="Asignado">Asignado</option>  
                <option value="Nuevo">Nuevo</option>  
              </select>        
            </div>

            {
              (status !== "Nuevo" && status !== "Finalizado") &&
                <div className=' flex justify-between items-center mb-4'>
                  <label htmlFor="estado" className='text-gray-900 font-semibold'>Prioridad:</label>

                  <select id="estado" className='text-center border border-azul rounded-lg w-[190px] py-[1px] bg-white' 
                  value={priorityTicketCurrent} onChange={({target}) => { setPriorityTicketCurrent(target.value); setMsgAlert({})}}
                  >
                    <option value="Sin Asignar">Sin Asignar</option>  
                    <option value="Alta">Alta</option>  
                    <option value="Media">Media</option>  
                    <option value="Baja">Baja</option>  
                  </select>        
                </div>
            }

            <div className="flex flex-col text-left w-full mb-4">
              <label className="block text-left text-gray-900 font-semibold mb-1 " htmlFor="diagnostico">Diagnóstico</label>
              <textarea className="h-[200px] sm:h-[165px] p-2 border border-gray-400 resize-none rounded-md  focus:border-azul focus:outline-none text-[15px] text-gray-900" id="diagnostico" 
                placeholder="Ingresar Diagnóstico"
                onChange={({target}) => {setDiagnosis(target.value.trimStart().slice(0, 250)); setMsgAlert({})}} value={diagnosis}
                ref={textRef}
              >{editTicket.diagnostico ?? ""}
              </textarea>
              <p className="text-[13px] p-1 text-gray-700">max 250 caracteres</p>
            </div>

            <button className="mt-4 bg-azul hover:bg-dark-azul text-white font-semibold py-2 px-4 rounded-lg w-full"
              type="submit">
                { 
                  status == "Asignado" 
                    ? "Editar Ticket" 
                    : status == "Nuevo" 
                      ? "Dejar Ticket"
                      : status
                  }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTicketOperatorMultiOptions
