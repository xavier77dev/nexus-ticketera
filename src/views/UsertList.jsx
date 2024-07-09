import React, { useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";
import { getAllUsers } from "../redux/actions/userActions";
import { getCompany } from "../redux/actions/companyActions"
import { useDispatch, useSelector } from "react-redux";
import UsserListItem from "../components/UserList/UsserListItem";
import { SearchBar } from "../components/Search/Search";
import { setSearch, setSortOrderUser } from "../redux/userSlice";
import { HeadTable } from "../components/UserList/HeadTable";
import Loading2 from "../components/Loading/loading2";
import { useNavigate } from "react-router-dom";



const UserList = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataCompanyUser, setdataCompanyUser] = useState(null) // Nuevo estado para el ticket seleccionado
  const [modalOpen, setModalOpen] = useState(false); // Nuevo estado para controlar si el modal está abierto
  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showAllUsers, setShowAllUsers] = useState(false); // Nuevo estado
  const [userFiltered, setUserFiltered] = useState([]);
  const [userData, setUserData] = useState();
  //Paginado
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser")) || false;
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.dataAllUsers)
  const company = useSelector((state) => state.company.dataCompany);
  const searchState = useSelector((state) => state.user.search);
  const sortOrders = useSelector((state) => state.user.sortOrderUser);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || false;



  useEffect(() => {
    dispatch(getAllUsers())

  }, []);


  useEffect(() => {
    setdataCompanyUser(company)
  }, []);


  useEffect(() => {
    setCurrentPage(1);
  }, [showAllUsers]);

  useEffect(() => {
  }, [sortOrders])


  const updateTotalPages = () => {
    const newTotalPages = Math.ceil(filteredUsers.length / usersPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages); // Si la página actual es mayor que la nueva cantidad de páginas, ajusta la página actual
    }
  };



  function sortedFilter(e) {
    dispatch(setSortOrderUser(e.target.value))
    updateTotalPages();
    setCurrentPage(1)


  }



  const filteredUsers = showAllUsers ? searchState : searchState.filter((user) => user.activo);

  const sortedUsers = () => {
    switch (sortOrders) {
      case "asc":
        return filteredUsers.slice().sort((a, b) => a.id - b.id);
      case "status":
        return filteredUsers
          .slice()
          .sort((a, b) => a.rol.localeCompare(b.rol));
      case "recent":
        return filteredUsers.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "all":
        return filteredUsers.slice().filter(usuario => usuario);
      case "client":
        return filteredUsers.slice().filter(usuario => usuario.rol === 'Cliente');
      case "admin":
        return filteredUsers.slice().filter(usuario => usuario.rol === 'Admin');
      case "operator":
        return filteredUsers.slice().filter(usuario => usuario.rol === 'Operator');
      default:
        return filteredUsers.slice().sort((a, b) => b.id - a.id);
    }
  };




  const indexOfLastUsers = currentPage * usersPerPage;
  const indexOfFirstUsers = indexOfLastUsers - usersPerPage;
  const currentUsers = sortedUsers().slice(indexOfFirstUsers, indexOfLastUsers);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedUsers().length / usersPerPage);


  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    dispatch(setSearch(allUsers))
  }, [allUsers]);

  if (loggedUser.rol === 'Cliente' || loggedUser.rol === 'Operator') {
    return navigate('/')
  }

  return (
    !allUsers.length ?

      <Loading2 />

      :

      <section className="m-4 p-4 rounded-xl font-poppins">

        <div className="my-4 bg-blanco w-full p-4 rounded-xl flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Listado de Usuarios</h3>
            <div className="flex flex-col md:flex-row md:items-center">
              <label htmlFor="sort">Filtrar por:</label>
              <select
                id="sorts"
                value={sortOrders}
                className="bg-white border rounded-md py-1 px-2 md:mr-4"
                onChange={(e) => sortedFilter(e)}
              >
                <option value="all">Todos los usuarios</option>
                <option value="client">Clientes</option>
                <option value="operator">Operadores</option>
                <option value="admin">Admins</option>

              </select>
              <div>
                <label htmlFor="sort">Ordenar por:</label>
                <select
                  id="sorts"
                  value={sortOrders}
                  className="bg-white border rounded-md py-1 px-2 md:mr-4"
                  onChange={(e) => sortedFilter(e)}
                >
                  <option value="desc">ID (Descendente)</option>
                  <option value="asc">ID (Ascendente)</option>
                  <option value="status">Estado</option>
                  <option value="recent">Usuarios mas recientes</option>
                </select>
              </div>
              {/* Nuevo botón para alternar entre ver todos los tickets y solo los tickets activos */}
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={showAllUsers}
                    onChange={() => setShowAllUsers(!showAllUsers)}
                  />
                  Mostrar todos los usuarios
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <SearchBar data={allUsers} setData={setSearch} />
          </div>
        </div>

        <div className="my-4 bg-blanco w-full p-4 rounded-xl">

          <table width="100%" >
            <HeadTable />
            <tbody>
              {(
                currentUsers.length <= 0 ?
                  <tr>
                    <td colSpan="6">No se encontró ningun Usuario.</td>
                  </tr> :
                  currentUsers.map((user) => (
                    <UsserListItem
                      user={user}
                      key={user.id}
                    />
                  ))
              )}
            </tbody>
          </table>
          <nav className="flex items-center justify-center">
            <ul className="flex justify-around items-center">
              {currentPage !== 1 && (
                <li>
                  <button
                    className="bg-blanco h-9 rounded-lg px-2 border-2 mx-2 transition hover:duration-300  hover:scale-110 "
                    onClick={prevPage}
                  >
                    Anterior
                  </button>
                </li>
              )}
              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <li
                  key={index}

                >
                  <button onClick={() => paginate(index + 1)} className={`${currentPage === index + 1
                    ? "bg-celeste flex justify-center items-center h-9 rounded-lg px-2 border-2 mx-2 cursor-default "
                    : "bg-blanco flex items-center justify-center h-9 rounded-lg px-2 border-2 mx-2 transition hover:duration-300  hover:scale-110 "
                    }`} >{index + 1}</button>
                </li>
              ))}
              {currentPage !== Math.ceil(filteredUsers.length / usersPerPage) && (
                <li className=" transition hover:duration-300  hover:scale-110 ">
                  <button
                    className="bg-blanco h-9 rounded-lg px-2 border-2 mx-2 transition hover:duration-300  hover:scale-110 "
                    onClick={nextPage}
                  >
                    Siguiente
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </section>
  );
};

export default UserList;
