import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TicketListItem from "../components/TicketList/TicketListItem";
import Loading from "../components/Loading/Loading";
import HeaderList from "../components/TicketList/HeaderList";
import TicketModal from "../components/TicketList/ticketModal";
import {
  setTickets,
  setSelectedTicket,
  setModalOpen,
  setSortOrder,
  setSearchTickets,
} from "../redux/tourStore/ticketSlice";
import { fetchData } from "../redux/tourStore/ticketActions";
import { SearchBar } from "../components/Search/Search";
import { GetTicketsUser } from "./getTicketsUser";

const TicketList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const [showAllTickets, setShowAllTickets] = useState(false); // Nuevo estado

  let allTickets = useSelector((state) => state.tickets.tickets);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const selectedTicket = useSelector((state) => state.tickets.selectedTicket);
  const modalOpen = useSelector((state) => state.tickets.modalOpen);
  const sortOrder = useSelector((state) => state.tickets.sortOrder);
  const searchState = useSelector((state) => state.tickets.searchTickets);

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || false;

  useEffect(() => {
    dispatch(fetchData(loggedUser));

  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [showAllTickets]);

  useEffect(() => {
    dispatch(setSearchTickets(allTickets));
  }, [allTickets, dispatch]);

  let filteredTickets = showAllTickets
    ? searchState
    : searchState.filter((ticket) => ticket.activo);

  const sortedTickets = () => {
    switch (sortOrder) {
      case "asc":
        return filteredTickets.slice().sort((a, b) => a.id - b.id);
      case "status":
        return filteredTickets
          .slice()
          .sort((a, b) => a.estado.localeCompare(b.estado));
      case "recent":
        return filteredTickets
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return filteredTickets.slice().sort((a, b) => b.id - a.id);
    }
  };

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = sortedTickets().slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const handleTicketClick = (ticket) => {
    dispatch(setSelectedTicket(ticket));
    dispatch(setModalOpen(true));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let ticketsToShow = filteredTickets; // Inicialmente, mostrar todos los tickets filtrados


  // Aplicar el filtro adicional si el usuario tiene el rol de operador
  if (loggedUser && loggedUser.rol === "Operador") {
    const userAssignedTickets = allTickets.filter(
      (ticket) => ticket.operario_id === loggedUser.id
    );
    ticketsToShow =
      userAssignedTickets.length > 0
        ? userAssignedTickets
        : filteredTickets.filter((ticket) => ticket.estado === "Nuevo");
  }


  return (
    <section className="m-4 p-4 rounded-xl font-poppins">
      <div className="my-4 bg-blanco w-full p-4 rounded-xl flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2">
            Listado de Tickets Creados
          </h3>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="sort" className="mr-2">
              Ordenar por:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => dispatch(setSortOrder(e.target.value))}
              className="bg-white border rounded-md py-1 px-2 md:mr-4"
            >
              <option value="desc">ID (Descendente)</option>
              <option value="asc">ID (Ascendente)</option>
              <option value="status">Estado</option>
              <option value="recent">Tickets mas recientes</option>
            </select>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showAllTickets}
                  onChange={() => setShowAllTickets(!showAllTickets)}
                  className="mr-2"
                />
                Mostrar todos los tickets
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4 md:mt-0">
          <SearchBar data={allTickets} setData={setSearchTickets} />
        </div>
      </div>

      <div className="bg-blanco rounded-xl text-center flex flex-col p-4">
        <table className="w-full justify-between items-center">
          <HeaderList />
          <tbody>
            {currentTickets.length === 0 ? (
              <tr>
                <td colSpan="7">No se encontró ningun Ticket.</td>
              </tr>
            ) : (
              currentTickets.map((ticket) => (
                <TicketListItem
                  ticket={ticket}
                  key={ticket.id}
                  openTicketModal={handleTicketClick}
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
              length: Math.ceil(filteredTickets.length / ticketsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  className={`${currentPage === index + 1
                    ? "bg-celeste flex justify-center items-center h-9 rounded-lg px-2 border-2 mx-2 cursor-default "
                    : "bg-blanco flex items-center justify-center h-9 rounded-lg px-2 border-2 mx-2 transition hover:duration-300  hover:scale-110 "
                    }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {currentPage !==
              Math.ceil(filteredTickets.length / ticketsPerPage) && (
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
        {modalOpen && selectedTicket && (
          <TicketModal
            selectedTicket={selectedTicket}
            closeModal={() => dispatch(setModalOpen(false))}
          />
        )}
      </div>
    </section>
  );
};

export default TicketList;
