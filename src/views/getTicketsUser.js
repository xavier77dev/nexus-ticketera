import axios from 'axios'

export const GetTicketsUser = async (idUser) => {

  const { data } = await axios(`${import.meta.env.VITE_URL}/tickets/creadoP/${idUser}`)

  return data;
}

