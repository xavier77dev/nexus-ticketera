import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, useParams} from "react-router-dom";

import EditTicketOperatorAutoAssigned from './EditTicketOperatorAutoAssigned.jsx';
import EditTicketOperatorMultiOptions from './EditTicketOperatorMultiOptions.jsx';

const EditTicketOperator = () => {
  const {id} = useParams();
  const {editTicket} = useSelector(state => state.user); 
  const navigate = useNavigate();

  const [msgAlert, setMsgAlert] = useState({});
  const [priorityTicketCurrent, setPriorityTicketCurrent] = useState(editTicket.prioridad);

  useEffect(() => {
    (!(id == editTicket.id)) && navigate("/ticketList");
  }, []);

  return (
    <>
    { 
      editTicket.estado == "Nuevo" 
        ?
          <EditTicketOperatorAutoAssigned editTicket={editTicket} msgAlert={msgAlert} setMsgAlert={setMsgAlert} 
          priorityTicketCurrent={priorityTicketCurrent} setPriorityTicketCurrent={setPriorityTicketCurrent}/>
        :  
          <EditTicketOperatorMultiOptions editTicket={editTicket} msgAlert={msgAlert} setMsgAlert={setMsgAlert} 
          priorityTicketCurrent={priorityTicketCurrent} setPriorityTicketCurrent={setPriorityTicketCurrent}/>  
    }
    </>
  )
}

export default EditTicketOperator
