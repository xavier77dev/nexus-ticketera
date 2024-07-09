import { useEffect, useRef, useState } from "react";
import useDate from "../../helpers/useDate.js";
import Alert from "../../hooks/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const CreateTicketUser = () => {
  const [incidence, setIncidence] = useState("");
  const [allTicketsId, setAllTicketsId] = useState([]);
  const [msgAlert, setMsgAlert] = useState({});
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser")) || false;
  const URL = `${import.meta.env.VITE_URL}/tickets`;
  const navigate = useNavigate();

  const textRef = useRef(null);

  const fnSwal = () => {
    Swal.fire({
      title: "Confirmar Crear Ticket",
      icon: "question",
      confirmButtonText: "Confirmar",
      showDenyButton: true,
      denyButtonText: "Cancelar"
    }).then(response => {
      if (response.isConfirmed) {
        postIncindece();
      } else if (response.isDenied) {
      }
    })
  }

  const postIncindece = async () => {
    try {
      const { data } = await axios.post(URL, {
        incidencia: incidence, usuario_id: getloggedUserLS.id, diagnostico: "", estado: "Nuevo", prioridad: "Sin Asignar", nota: " ", activo: true
      });
      setIncidence("");
      navigate(`/ticketDetail/${data.id}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (incidence.trim() === "") {
      return setMsgAlert({ msg: "Introducir el texto", error: true })
    }

    setMsgAlert({});
    fnSwal();
  }

  const getTickets = async () => {
    // const findAllTicketsIdURL = `/tickets/creadop/${getloggedUserLS.id}`
    const findAllTicketsIdURL = `${import.meta.env.VITE_URL}/tickets/creadop/${getloggedUserLS.id}`
    const { data } = await axios(findAllTicketsIdURL);
    setAllTicketsId(data);
  }

  useEffect(() => {
    textRef.current.select();
    getTickets();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center font-poppins py-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[90%] sm:w-[400px] p-10 shadow-2xl bg-white rounded-lg">

        <div className="flex justify-between w-full mb-10 flex-wrap items-center">
          <p className=" text-gray-900 rounded-xl px-2 text-[14px]">{useDate(new Date)}</p>
          <p className=" rounded-xl px-2 text-gray-900 text-[14px]"> {getloggedUserLS.email}</p>
        </div>
        {msgAlert.error && <Alert alert={msgAlert} />}

        <div className="flex flex-col text-left w-full mb-4">
          <label className="block text-left text-gray-900 mb-2 font-semibold" htmlFor="texto">Incidencia:</label>
          <textarea className="h-[200px] sm:h-[165px] p-2 border border-gray-400 rounded-md resize-none focus:border-azul focus:outline-none"
            id="texto" placeholder="Ingresar Incidencia"
            onChange={({ target }) => { setIncidence(target.value.trimStart().slice(0, 250)); setMsgAlert({}) }} value={incidence}
            ref={textRef}
          ></textarea>
          <p className="text-[13px] text-gray-900 py-1">max 250 caracteres</p>
        </div>

        <button className=" bg-azul w-full rounded-md p-2 text-white font-semibold hover:bg-dark-azul transition-colors">Crear Ticket</button>
      </form>
    </div>
  )
}

export default CreateTicketUser 
