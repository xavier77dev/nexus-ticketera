import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#fff] shadow  w-full mx-auto p-5 md:flex md:items-center md:justify-between  bottom-0 left-0">
      <span className="text-sm text-gray-500 sm:text-center">
        © 2024{" "}
        <a
          href="http://github.com/No-Country"
          target="_blank"
          className="hover:underline"
        >
          Proyecto realizado sobre plataforma NoCountry. All Rights Reserved.
        </a>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link to="/card" className="hover:underline me-4 md:me-6">
            {" "}
            Sobre nosotros
          </Link>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Política de privacidad
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contacto
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
