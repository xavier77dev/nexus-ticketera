import axios from "axios"
import { setUser, setAllUsers, setUserMsgErr, setFormState, isLoged, setUpdateClient, setSearch } from "../userSlice"


export const getUser = (id) => {
  return async (dispatch) => {
    try {

      // const response = await axios.get(`https://localhost:3004/usuarios/${id}`)
      const response = await axios.get(`${import.meta.env.VITE_URL}/usuarios/${id}`)

      const data = response.data
      data
        ? dispatch(setUser(data))
        : dispatch(setUserMsgErr("No se encontraron usuarios"))
    } catch (error) {

      console.log(`Error: ${error.message}`)
      dispatch(setUserMsgErr(error))
    }
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    try {

      // const response = await axios.get("https://localhost:3004/usuarios")
      const response = await axios.get(`${import.meta.env.VITE_URL}/usuarios`)

      const data = response.data
      data
        ? dispatch(setAllUsers(data))
        : dispatch(setUserMsgErr("No se encontraron usuarios"))
    } catch (error) {

      console.log(`Error: ${error.message}`)
      dispatch(setUserMsgErr(error))
    }
  }
}

export const createUser = (userData) => {
  return async (dispatch) => {
    if (userData?.password !== "" && userData?.nombre !== "" && userData?.apellido !== "" && userData?.email !== "" && userData?.compania !== "" && userData?.rol !== "") {
      try {
        const response = await axios.post(`${import.meta.env.VITE_URL}/usuarios`, userData)

        const data = response.data;
        data
          ? dispatch(setUser(data)) && Swal.fire("Usuario Creado!", "", "Ok")
          : dispatch(setUserMsgErr("Auch... algo salio mal"))

      } catch (error) {
        dispatch(setUserMsgErr(error))
        console.log(`Error: ${error.message}`)
      }
    }
  }
}

export const updateUser = (userData) =>
  async (dispatch) => {
    try {
      const response = await axios.put(`import.meta.env.VITE_URL / usuarios / editar`, userData);
      const data = response.data;
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setUserMsgErr(error));
    }
  };


export const changeStateForm = (state) => {
  return (dispatch) => {
    return dispatch(setFormState(!state))
  }
}

export const isLog = () => {
  return (dispatch) => {
    try {
      const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser")) || false;
      if (getloggedUserLS) {
        return dispatch(isLoged(getloggedUserLS))
      }
    } catch (error) {
      console.log(error + ":No se detectó sessión")
    }
  }
}

export const updateLocaStorage = (data) => {
  return async (dispatch) => {
    try {
      const updateData = await dispatch(getUser(data.id))
      const dataJson = JSON.parse(localStorage.getItem("loggedUser"))
      if (dataJson.id === data.id && localStorage.getItem("loggedUser")) {
        localStorage.setItem("loggedUser", JSON.stringify(updateData))
      }
    } catch {
      console.log(error + ":No se detectó sessión")
    }
  }
}

export const deleteUser = (userData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_URL} / usuarios / editar`, userData);
      const data = response.data

      dispatch(getUser(data))

      navigate('/')
      navigate('/userList')

      return;
    } catch (error) {
      dispatch
      console.log(error.message);
    }

  }
}
