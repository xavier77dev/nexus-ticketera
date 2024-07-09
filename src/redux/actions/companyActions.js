import axios from "axios"
import { setCompany, setAllCompanies, setCompanyMsgErr } from "../companySlice"



export const getCompany = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        // `https://localhost:3004/compania/${id}`
        `${import.meta.env.VITE_URL}/compania/${id}`
      );

      const data = response.data;
      if (data) {
        dispatch(setCompany(data));
      } else {
        dispatch(setCompanyMsgErr("La compañía no existe"));
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      dispatch(setCompanyMsgErr(error.message));
    }
  };
}

export const getAllCompanies = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        // "https://localhost:3004/compania"
        `${import.meta.env.VITE_URL}/compania`
      )

      const data = response.data;
      data
        ? dispatch(setAllCompanies(data))
        : dispatch(setCompanyMsgErr("No hay companias registradas"))

    } catch (error) {
      console.log(`Error: ${error.message}`)
      dispatch(setCompanyMsgErr(error))
    }
  }
}


export const createCompany = (companyData) => {
  return async (dispatch) => {
    try {
      // const response = await axios.post("https://localhost:3004/compania", companyData)
      const response = await axios.post(`${import.meta.env.VITE_URL}/compania`, companyData)

      const data = response.data;
      data
        ? dispatch(setAllCompanies(data))
        : dispatch(setCompanyMsgErr("No se ha podído crear la compania"))
    } catch (error) {
      console.log(`Error: ${error.message}`)
      dispatch(setCompanyMsgErr(error))
    }
  }
}
