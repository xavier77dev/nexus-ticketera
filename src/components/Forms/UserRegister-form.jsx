import React, { useEffect, useState } from 'react';
import validateForm from '../utils/formUserValidation';
import { createUser, getAllUsers } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCompanies } from '../../redux/actions/companyActions';
import CompanyForm from './CompanyRegister-form';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';



const UserForm = () => {

  const dispatch = useDispatch()
  const companies = useSelector((state) => state.company.allCompanies);
  const allUsers = useSelector(state => state.user.dataAllUsers);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCompanies())
    dispatch(getAllUsers())
  }, []);

  useEffect(() => {
  }, [companies]);

  const [errors, setErrors] = useState({});
  const [touchFields, setTouchFields] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    contraseña: '',
    activo: true,
    rol: 'Cliente',
    compania_id: '',
    ocupado: false,

  });



  const closet = () => {
    Swal.fire({
      title: "Salir sin guardar",
      icon: "info",
      confirmButtonText: `${loggedUser.rol === "Admin" ? "Volver a lista de usuarios" : "Volver a Tickets"} `,
      showDenyButton: true,
      denyButtonText: "Seguir editando"
    }).then(response => {
      if (response.isConfirmed) {
        loggedUser.rol === 'Admin' ? navigate('/userList') : navigate('/ticketList')
      } else if (response.isDenied) {
      }
    })
  }




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(errors)
    if (Object.keys(errors).length === 0) {
      try {
        Swal.fire({
          title: 'Usuario registrado',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Cerrar',
          buttonsStyling: true
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(getAllCompanies())
            dispatch(createUser(formData))
            setTouchFields({
              email: false,
              nombre: false,
              apellido: false,
              contraseña: false,
              activo: false,
              rol: false,
              compania_id: false,
            })
          }
        })

        setFormData({
          email: '',
          nombre: '',
          apellido: '',
          contraseña: '',
          activo: true,
          rol: 'Cliente',
          compania_id: '',
          ocupado: false,
        });
      } catch (error) {
        Swal.fire("No se pudo crear el usuario", "Falta llenar campos obligatorios", "Aceptar")

      }
    } else {
      Swal.fire(
        "No se pudo crear el usuario",
        errors.email || errors.contraseña || "Falta llenar campos obligatorios",
        "Aceptar"
      );

    }
  }

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchFields(prevState => ({ ...prevState, [name]: true }))
  }

  useEffect(() => {
    setErrors(validateForm(formData, allUsers))
  }, [formData])


  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className=" flex flex-col justify-start items-center my-[5%] bg-blanco p-6 rounded-lg shadow-md w-[49.25rem]">
        <div className='flex justify-end w-full'>
          <Link onClick={closet} className="flex justify-end aling-center">
            <CloseIcon className="" style={{ fontSize: '32.5px' }} />
          </Link>
        </div>
        <h3 className="flex text-[1.8rem] font-bold ml-[1.5rem] text-left w-[40rem] mb-[0.8rem] mt-[3rem]">Nuevo Usuario</h3>


        <div className="border-t border-gray-500 w-[37rem]"></div>

        <form onSubmit={handleSubmit} className="p-6 rounded-lg w-[40rem]">
          <div className='flex w-[40rem]'>
            <div className="flex flex-col gap-2 mt-4 w-[18rem]">
              <label className="text-gray-700 font-semibold">Nombre:</label>
              <div className="border border-gray-300 rounded-md flex items-center ">
                <input
                  className="input bg-white border-gray-300 rounded-md px-4 py-1 w-full focus:outline-none"
                  type="text"
                  name="nombre"
                  placeholder='Jane'
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              {touchFields.nombre && errors.nombre && <span style={{ color: 'red' }}>{errors.nombre}</span>}
            </div>

            <div className="flex flex-col gap-2 mt-4 ml-[1rem] w-[18rem]">
              <label className="text-gray-700 font-semibold">Apellido:</label>
              <div className="border border-gray-300 rounded-md flex items-center " >
                <input
                  className="input bg-white border-gray-300 rounded-md px-4 py-1 w-full focus:outline-none"
                  type="text"
                  name="apellido"
                  placeholder='Doe'
                  value={formData.apellido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              {touchFields.apellido && errors.apellido && <span style={{ color: 'red' }}>{errors.apellido}</span>}
            </div>
          </div>


          <div className="flex-col w-[37rem]">
            <div className="flex flex-col gap-2 mt-4">
              <label className="text-gray-700 font-semibold">Compañia:</label>
              <div className="border border-gray-300 rounded-md flex items-center mb-[1.5rem]">
                <select
                  className="input bg-white border-gray-300 rounded-md px-4 py-1 w-[40rem] focus:outline-none"
                  type=""
                  name="compania_id"
                  value={formData.compania_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Seleccione una compañía</option>
                  {!companies.length > 0 ? <p>Cargando..</p> : companies.map(company => (
                    <option key={company.id} value={company.id}>{company.nombre}</option>
                  ))}

                </select>
              </div>
              {touchFields.compania_id && errors.compania_id && <span className='mt-[-2rem] ml-[0.2rem] mb-[0.5rem]' style={{ color: 'red' }}>{errors.compania_id}</span>}
            </div>
            <CompanyForm />
          </div>

          <div className="flex flex-col gap-2 mt-4 w-[37]">
            <label className="text-gray-700 font-semibold">Email</label>
            <div className="border border-gray-300 rounded-md flex items-center">
              <input
                className="input bg-white border-gray-300 rounded-md px-4 py-1 w-[40rem] focus:outline-none"
                type="email"
                name="email"
                value={formData.email}
                placeholder='ejemplo@empresa.com'
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
            {touchFields.email && errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2 mt-4 w-[37]">
            <label className="text-gray-700 font-semibold">Constraseña</label>
            <div className="border border-gray-300 rounded-md flex items-center">
              <input
                className="input bg-white border-gray-300 rounded-md px-4 py-1 w-[37rem] focus:outline-none"
                type="password"
                name="contraseña"
                placeholder='********'
                value={formData.contraseña}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
          </div >
          {touchFields.contraseña && errors.contraseña && <span style={{ color: 'red' }}>{errors.contraseña}</span>}


          <div className="flex-col w-[37rem] mt-4">
            <label className="text-gray-700 font-semibold">Rol:</label>
            <div className="border border-gray-300 rounded-md flex items-center mb-[1.5rem]">

              <select
                className="input bg-white border-gray-300 rounded-md px-4 py-1 w-[37rem] focus:outline-none"
                type=""
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                required
              >
                <option value="Cliente" selected>Cliente</option>
                <option value="Operator" >Operator</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {touchFields.compania && errors.compania && <span style={{ color: 'red' }}>{errors.compania}</span>}
          </div>

          <button className="mt-4 bg-azul hover:bg-dark-azul text-white font-semibold py-2 px-4 rounded-lg w-full" type="submit">Registrar</button>
        </form>

      </div>
    </div>
  );
};

export default UserForm;
