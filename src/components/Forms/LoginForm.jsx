import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import UserIcon from "../../assets/Icons/userIcon.svg";

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("test-client@gmail.com");
  const [password, setPassword] = useState("1234567");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        // "/usuarios/login",
        `${import.meta.env.VITE_URL}/usuarios/login`,
        {
          email: email,
          contraseña: password,
        }
      );

      if (
        response.data &&
        response.data.id &&
        response.data.email &&
        response.data.rol
      ) {
        if (response.data.activo === false) {
          Swal.fire({
            icon: "warning",
            title: "Usuario inhabilitado",
            text: "Disculpe las molestias ocasionadas. Por consultas, puede comunicarse al 0800-123-4567",
          });
        } else {
          localStorage.setItem("loggedUser", JSON.stringify(response.data));
          setIsLoggedIn(true);
        }
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.warn("Error al iniciar sesión:", error);
    }
  };

  if (isLoggedIn) {
    window.location.href = "/";
    history.pushState(null, null, "/");
    window.onpopstate = function () {
      history.go(1);
    };
  }

  return (
    <div className="flex justify-center items-center font-poppins">
      <form
        className="bg-blanco lg:w-1/3 rounded-xl shadow-md flex flex-col p-6"
        onSubmit={handleSubmit}
      >
        {showErrorMessage && (
          <p className="text-center m-4" style={{ color: "red" }}>
            Por favor, completa todos los campos requeridos
          </p>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-dark-azul font-medium">Email:</label>
          <div
            className={`border-2 border-[#E0E0E0] bg-white h-10 rounded-xl px-1 flex items-center ${showErrorMessage ? "border-red" : ""
              }`}
          >
            <i className="bg-white">
              <img src={UserIcon} alt="" />
            </i>
            <input
              type="email"
              className="input px-2 py-1 w-full focus:outline-none hover:border-dark-celeste"
              placeholder="Ingrese su Correo Electrónico"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          {showErrorMessage && (
            <p style={{ marginLeft: "10px", fontSize: "12px", color: "red" }}>
              Usuario no encontrado / incorrecto
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-dark-azul font-medium">Contraseña:</label>
          <div
            className={`border-2 border-[#E0E0E0] bg-white h-10 rounded-xl px-1 flex items-center ${showErrorMessage ? "border-red" : ""
              }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="input px-2 py-1 w-full focus:outline-none"
              placeholder="Ingrese su Contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            {showPassword ? (
              <FaEye
                onClick={togglePasswordVisibility}
                style={{ marginRight: "7px" }}
              />
            ) : (
              <FaEyeSlash
                onClick={togglePasswordVisibility}
                style={{ marginRight: "7px" }}
              />
            )}
          </div>
          {showErrorMessage && (
            <p style={{ marginLeft: "10px", fontSize: "12px", color: "red" }}>
              Contraseña Incorrecta
            </p>
          )}
        </div>
        <button
          type="submit"
          className="mt-6 bg-dark-azul hover:bg-azul text-white font-semibold py-2 px-4 rounded-lg w-full"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
