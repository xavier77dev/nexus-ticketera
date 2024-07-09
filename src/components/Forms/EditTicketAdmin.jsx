import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from "react-router-dom";
import useDate from "../../helpers/useDate.js";
import axios from 'axios';
import Alert from '../../hooks/Alert.jsx';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading.jsx';
import CloseIcon from '@mui/icons-material/Close';
import InfoTicketUserRol from './InfoTicketUserRol.jsx';


const EditTicketAdmin = () => {
  const {id} = useParams();
  const {editTicket} = useSelector(state => state.user); 
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({});
  const [dataOperatorsNoBusy, setDataOperatorsNoBusy] = useState([]);
  const [operatorId, setOperatorId] = useState("");
  const [operatorAssingInfo, setOperatorAssingInfo] = useState({});
  const [estado, setEstado] = useState(editTicket.estado);
  const [msgAlert, setMsgAlert] = useState({});
  const [priorityTicketCurrent, setPriorityTicketCurrent] = useState(editTicket.prioridad);

  const getInfoUser = async () => {
    const URL = `/usuarios/${editTicket.usuario_id}`;
    try {
      const {data} = await axios(URL);
      setDataUser(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const getInfoOperatorAssing = async () => {
    if (operatorId > 0) {
      const URL = `/usuarios/${operatorId}`;
      try {
        const {data} = await axios(URL);
        setOperatorAssingInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setOperatorAssingInfo("");
    }
  }

  const getAllInfoOperatorsNoBusy = async () => {
    const URL = `/usuarios`;
    try {
      const {data} = await axios(URL);
      const filterOperatorNoBusy = data.filter(operator => !operator.ocupado && (operator.rol == "Operator"))

      setDataOperatorsNoBusy(filterOperatorNoBusy);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getInfoUser();
    getAllInfoOperatorsNoBusy();
    
    (!(id == editTicket.id)) && navigate("/ticketList");
  }, []);

  useEffect(() => {
    if (operatorId > 0) {
      setEstado("Asignado");
      setMsgAlert({})
    } else {
      setEstado("Nuevo");
    }

    getInfoOperatorAssing();
  }, [operatorId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(operatorId > 0)) {
      return setMsgAlert({msg: "Ingresar un Id de operador", error: true})
    }

    swal();
  }
  
  const swal = () => {
    Swal.fire({
      title: "Confirmar para Asignar Operario",
      icon: "question",
      confirmButtonText: "Confirmar",
      showDenyButton: true,
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {
        assingOperator();
      } else if (response.isDenied) {
      }
    }) 
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

  const assingOperator = async () => {
    const URL = "/tickets/editar";
    const URL_USUARIOS = "/usuarios/editar";
    try { 
        await axios.put(URL, { incidencia: editTicket.incidencia, usuario_id:editTicket.usuario_id,  diagnostico: editTicket.diagnostico, estado, prioridad: priorityTicketCurrent, operario_id: operatorId, activo: editTicket.activo, nota: editTicket.nota, id: editTicket.id
      });
      
      await axios.put(URL_USUARIOS,{
        contraseña: operatorAssingInfo.contraseña, email: operatorAssingInfo.email, activo: operatorAssingInfo.activo ,
        rol: operatorAssingInfo.rol, id: operatorAssingInfo.id,
        ocupado: true
      });
    navigate(`/ticketDetail/${editTicket.id}`);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <>
    { Object.keys(dataUser).length > 0 ?
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start my-7 gap-10 flex-wrap sm:px-10">  
      
        <InfoTicketUserRol editTicket={editTicket} rol={getloggedUserLS.rol}/>

        <div className="font-poppins flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-5 sm:p-10 relative">
        <Link onClick={closet}>
          <CloseIcon className="test-black absolute top-0 right-0" style={{ fontSize: '32.5px' }}/>
        </Link>
          <h3 className="text-2xl font-bold mb-7 text-gray-900 text-left w-full">Editat Ticket</h3>
          <div className=" flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
            {Object.keys(msgAlert).length > 0 && <Alert alert={msgAlert}/>}

            <form  onSubmit={handleSubmit} className="rounded-lg w-72">

              <div className='flex justify-between items-center mb-4'>
                <label htmlFor="estado" className='block text-left text-gray-900 font-semibold'>Operario:</label>

                <select id="estado" className='text-center p-[1px] border border-azul rounded-lg w-[190px] bg-white' 
                value={operatorId} onChange={({target}) => setOperatorId(target.value)}
                >
                  <option>Seleccionar</option>  
                  {
                    dataOperatorsNoBusy.map(user => {
                      return (
                        <option 
                        key={user.id} value={user.id}>{!user.ocupado && `${user.nombre.toUpperCase()} ${user.apellido.toUpperCase()}` }</option>
                      )
                    })
                  }
                </select>              
              </div>
  
              <div className='flex justify-between items-center mb-4'>
                <label className='text-gray-900 font-semibold uppercase'>id:</label>

                <p className={`text-center normal-case p-[1px] border w-[190px] ${!(operatorId > 0) ? 'border-azul' : 'bg-green border-green'} rounded-lg`}>{operatorAssingInfo.id > 0 ? operatorAssingInfo.id : "-"}</p>         
              </div>
            
              <div className='flex justify-between items-center mb-4'>
                <label htmlFor="estado" className='text-gray-900 font-semibold'>Prioridad:</label>

                <select id="estado" className='text-center p-[1px] border border-azul rounded-lg w-[190px] bg-white' 
                value={priorityTicketCurrent} onChange={({target}) => { setPriorityTicketCurrent(target.value); setMsgAlert({})}}
                >
                  <option value="Sin Asignar">{editTicket.prioridad}</option>  
                  <option value="Alta">Alta</option>  
                  <option value="Media">Media</option>  
                  <option value="Baja">Baja</option>  
                </select>        
              </div>
              
              <button className="mt-4 bg-azul hover:bg-dark-azul text-white font-semibold py-2 px-4 rounded-lg w-full"
                type="submit">Asignar Operario
              </button>
            </form>
          </div>
        </div>
      </div>
      : <Loading/>  
    }
    </>
  )
}

export default EditTicketAdmin
