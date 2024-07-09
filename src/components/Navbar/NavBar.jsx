import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/LogoBlanco.png";

const Nav = ({ isLoggedIn }) => {
  const [loggedOut, setLoggedOut] = useState(false);
  const location = useLocation();

  const getloggedUserLS =
    JSON.parse(localStorage.getItem("loggedUser")) || false;
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");

    setLoggedOut(true);
  };

  if (loggedOut) {
    window.location.href = "/";
  }

  return (
    <nav className="bg-dark-azul text-blanco font-poppins">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <NavLink to="/" className="flex-shrink-0 flex items-center">
            <img className="h-16 w-auto" src={Logo} alt="Your Company" />
          </NavLink>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`${location.pathname === "/"
                  ? "bg-azul text-white rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                  : "rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                  }`}
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/ticketList"
                className={`${location.pathname === "/ticketList"
                  ? "bg-azul text-white rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                  : " rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                  }`}
              >
                Tickets
              </Link>
              {getloggedUserLS.rol == "Admin" && (
                <Link
                  to="/userList"
                  className={`${location.pathname === "/userList"
                    ? "bg-azul text-white rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                    }`}
                >
                  Usuarios
                </Link>
              )}

              {getloggedUserLS.rol == "Admin" && (
                <Link
                  to="/userRegister"
                  className={`${location.pathname === "/userRegister"
                    ? "bg-azul text-white rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                    : " rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                    }`}
                >
                  Registro
                </Link>
              )}
              {getloggedUserLS.rol == "Cliente" && (
                <Link
                  to="/create-ticket"
                  className={`${location.pathname === "/create-ticket"
                    ? "bg-azul text-white rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                    : "text-gray-300  rounded-md px-3 py-2 text-sm font-medium transition hover:duration-300  hover:scale-110"
                    }`}
                >
                  Crear Ticket
                </Link>
              )}
            </div>
          </div>
          {/* <-- Section Cerrar Sesion --> */}
          <div >
            <div className="flex flex-row items-center">
              <div className="absolute inset-y-0 right-0 flex flex-col items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {getloggedUserLS && getloggedUserLS.nombre && (
                  <p className="text-xl align-top">{`${getloggedUserLS.nombre} ${getloggedUserLS.apellido}`}</p>
                )}
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-blanco bg-celeste h-6 w-28 items-center flex justify-center rounded-md py-1 text-sm "
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <Link
                    to="/"
                    className={`${location.pathname === "/"
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      }`}
                  >
                    Iniciar sesión
                  </Link>
                )}



              </div>
              <div>
                <div className="relative ml-3">
                  <div>
                    <Link
                      to={`/userDetail/${getloggedUserLS.id}`}
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <-- Otro menu--> */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className={`block rounded-md px-3 py-2 text-base font-medium transition-transform hover:scale-150 ease-in-out ${location.pathname === "/" ? "bg-dark-azul" : ""
              }`}
            aria-current="page"
          >
            Home
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className={`${location.pathname === "/login"
                ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                }`}
            >
              Iniciar sesión
            </Link>
          )}
          <Link
            to="/userRegister"
            className={`${location.pathname === "/userRegister"
              ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              }`}
          >
            Registrarse
          </Link>
          <Link
            to="/ticketList"
            className={`${location.pathname === "/ticketList"
              ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              }`}
          >
            Ticket List
          </Link>
          {getloggedUserLS.rol == "Cliente" && (
            <Link
              to="/create-ticket"
              className={`${location.pathname === "/create-ticket"
                ? "bg-green-500 text-white hover:bg-green-700 rounded-md px-3 py-2 text-sm font-medium shadow-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                }`}
            >
              Crear Ticket
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
