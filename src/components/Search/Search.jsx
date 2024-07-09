// import SearchIcon from '@mui/icons-material/Search';
// import { useEffect } from 'react';
// import { SearchItems, getAllUsers } from '../../redux/actions/userActions';

import { useState } from 'react';
import { useDispatch } from 'react-redux';


export const SearchBar = ({ data, setData }) => { //pasa como parametro data (array que va a mirar) y setData (funcion que va a modificar el estado global)
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  let filteredData = [] // estado temporal para filtrar los datos que luego se va a despachar en la función seteadora
  const filtered = (data, input) => {
    return data.filter(elemento => {
      const lowerInput = input.toLowerCase();
      return (
        (elemento.hasOwnProperty('id') && elemento.id.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('nombre') && elemento.nombre.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('email') && elemento.email.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('estado') && elemento.estado.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('rol') && elemento.rol.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('compania_id') && elemento.compania_id.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('id') && elemento.id.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('prioridad') && elemento.prioridad.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('estado') && elemento.estado.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('usuario_id') && elemento.usuario_id.toString().toLowerCase().includes(lowerInput)) ||
        (elemento.hasOwnProperty('createdAt') && elemento.createdAt.toString().toLowerCase().includes(lowerInput))
      );
    });
  };

  const handleChange = (event) => {
    const dataInput = event.target.value.toLowerCase(); // Convertir el valor del input a minúsculas
    setInputValue(dataInput)
    filteredData = dataInput ? filtered(data, dataInput) : data; // estaparte se encarga de filtrar: si no hay input, se filtra todos los datos, si hay input, se filtra los datos que coincidan con el input
    dispatch(setData(filteredData));
    // Cada vez que se dispara el evento, se hace un filtro de los datos y se actualiza el estado global
  };



  return (
    <form className="max-w-md mx-auto">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input value={inputValue} onChange={handleChange} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar..." required />

      </div>
    </form>
  )


}
