import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import './App.css'
import TicketDetail from './views/TicketDetail';
import { UserRegister } from './views/UserRegister';
import Footer from './components/Footer/Footer';
import Nav from './components/Navbar/NavBar';
import Home from './views/Home';
import TicketList from './views/TicketList';
import CardContainer from "./components/AboutUs/CardContainer";


import LoginForm from "./components/Forms/LoginForm";
import Ticket from "./views/Ticket";
import NavLogout from "./components/Navbar/NavBarLogout";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLog } from "./redux/actions/userActions";
import UserList from "./views/UsertList";
import UserEditForm from "./components/Forms/UserEdit-form";
import EditTicketAdmin from "./components/Forms/EditTicketAdmin";
import EditTicketOperator from "./components/Forms/EditTicketOperator";
import EditTicketUser from "./components/Forms/EditTicketUser";
import { UserDetail } from "./views/UserDetail";
import EditTickeNotetUser from "./components/Forms/EditTicketNoteUser";
function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const isLoged = useSelector(state => state.user.loged)
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser")) || false;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setIsLoggedIn(true);
    }
  }, []);


  useEffect(() => {
    dispatch(isLog())
  }, [dispatch])

  return ( // <main className="min-h-screen bg-[#a5b4fc] flex flex-col justify-between"> <main className="min-h-screen bg-[#1f4f45] flex flex-col justify-between">

    <main className="min-h-screen bg-gradient-to-tr from-cyan via-dark-celeste to-dark-azul flex flex-col justify-between bg-cover">




      {getloggedUserLS && getloggedUserLS.activo ? <Nav isLoggedIn={isLoggedIn} /> : <NavLogout />}

      <Routes>
        {getloggedUserLS ? <Route path='/' element={<Home />} /> : <Route path='/' element={<LoginForm />} />}
        {getloggedUserLS.rol == "Admin" && <Route path='/userRegister' element={<UserRegister />} />}
        {/* <Route path='/userRegister' element={<UserRegister />} /> */}
        <Route path='/ticketDetail' element={<TicketDetail />} />
        <Route path='/ticketList' element={<TicketList />} />
        <Route path='/userList' element={<UserList />} />
        <Route path='/userDetail/:id' element={<UserDetail />} />
        <Route path='/create-ticket' element={<Ticket />} />

        {getloggedUserLS.rol == "Admin" && <Route path='/edit-ticket/:id' element={<EditTicketAdmin />} />}
        {getloggedUserLS.rol == "Operator" && <Route path='/edit-ticket/:id' element={<EditTicketOperator />} />}
        {getloggedUserLS.rol == "Cliente" && <Route path='/edit-ticket/:id' element={<EditTicketUser />} />}

        {getloggedUserLS.rol == "Cliente" && <Route path='/edit-ticket-note/:id' element={<EditTickeNotetUser />} />}

        <Route path="/ticketDetail/:id" element={<TicketDetail />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/card' element={<CardContainer />} />
      </Routes>

      <Footer />
    </main>
  )
}

export default App
