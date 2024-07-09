import { Link } from "react-router-dom";
import Logo from "../../assets/images/LogoBlanco.png";


const NavLogout = () => {
  return (
    <nav className="bg-dark-azul">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" 
            // className="flex flex-shrink-0 items-center cursor-pointer"
            className={`${location.pathname === "/" ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}`}
            >
              <img
                className="h-14 w-auto"
                src={Logo}
                alt="Nexus It Services Logo"
              />
            </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default NavLogout;
