import axios from 'axios';
import { setTickets } from './ticketSlice';

// const URL = "https://localhost:3004";
const URL = import.meta.env.VITE_URL;
export const getAllTicket = () => {
  return async (dispatch) => {


    try {
      const response = await axios.get(`${URL}/tickets`);
      dispatch(setTickets(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTicketsByClientId = (clientId) => {
  return async (dispatch) => {

    try {
      const response = await axios.get(`${URL}/Tickets/creadoP/${clientId}`); // Solicitar tickets por ID de cliente
      dispatch(setTickets(response.data));

    } catch (error) {
      console.log(error);
    }
  };
};


export const fetchData = (loged) => {
  return async (dispatch) => {
    try {
      if (loged) {
        if (loged.rol === "Cliente") {
          const response = await axios.get(`${URL}/Tickets/creadoP/${loged.id}`); // Solicitar tickets por ID de cliente
          dispatch(setTickets(response.data));
        } else {
          const response = await axios.get(`${URL}/tickets`);
          dispatch(setTickets(response.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
