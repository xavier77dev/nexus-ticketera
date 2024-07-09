import React, { useEffect, useState } from 'react';
import { getUser, updateLocaStorage, updateUser } from '../../redux/actions/userActions';
import { getCompany } from '../../redux/actions/companyActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Loading2 from '../Loading/loading2';





const UserEditForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id])



  const recentData = useSelector(state => state.user.dataUser)
  useEffect(() => {
    dispatch(getCompany(recentData.compania_id))
  }, [recentData])
  const companiaUser = useSelector(state => state.company.dataCompany)

  const [errors, setErrors] = useState({});
  const [touchFields, setTouchFields] = useState({});
  const [formData, setFormData] = useState({
    id: id,
    contraseña: "",
    email: "",
    activo: "",
    rol: "",
    ocupado: "",
  });



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¡Vas a editar un usuario!',
      text: `Se modificarán los siguientes campos: ${JSON.stringify(Object.keys(formData)
        .filter(key => key !== "id" && formData[key] !== "")
        .map(key => (`${key} : ${formData[key]} `))
        .join(",    ")
      )}`,
      icon: 'warning',
      iconColor: 'orange',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar edición',
      showCancelButton: true,
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Haz algo si se confirma

        formData.contraseña = formData.contraseña === "" ? recentData.contraseña : formData.contraseña;
        formData.email = formData.email === "" ? recentData.email : formData.email;
        formData.activo = formData.activo === "" ? recentData.activo : formData.activo;
        formData.rol = formData.rol === "" ? recentData.rol : formData.rol;
        formData.ocupado = formData.ocupado === "" ? recentData.ocupado : formData.ocupado;

        try {
          Swal.fire({
            title: 'Usuario editado',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Cerrar',
            buttonsStyling: true
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(updateUser(formData))
              if (recentData.id === loggedUser.id) {
                updateLocaStorage(recentData);
              } else {
              }
              setTouchFields({
                email: false,
                contraseña: false,
                activo: false,
                rol: false,
                ocupado: false,
              });
              dispatch(getUser(id));
            }
          });

          setFormData({
            email: "",
            contraseña: "",
            activo: "",
            rol: "",
            ocupado: "",
          });
        } catch (error) {
          Swal.fire("No se pudo editar el usuario", "Ouch, algo salió mal...", "Aceptar");
          console.log(error);
        }
      } else {

      }
    })
  }

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchFields(prevState => ({ ...prevState, [name]: true }))
  }

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

  return (
    !recentData.nombre && !companiaUser ?
      <Loading2 />
      :
      <div className=" flex flex-col justify-center items-center font-poppins">

        <div className=" flex flex-col justify-center items-center my-[5%] bg-blanco p-6 rounded-lg shadow-md h-[36rem] w-[32rem]">
          <div className='flex-col items-center justify-center w-[28rem]'>
            <div className='flex justify-end w-full'>
              <Link onClick={closet} className="flex justify-end aling-center">
                <CloseIcon className="" style={{ fontSize: '32.5px' }} />
              </Link>
            </div>
            {loggedUser.rol === 'Admin' && recentData.id !== loggedUser.id ? <h3 className="flex text-[1.8rem] font-bold ml-[1.5rem] text-left w-[40rem] mb-[0.8rem] ">Editar Usuario</h3>
              : <h3 className="flex text-[1.8rem] font-bold ml-[1.5rem] text-left w-[40rem] mb-[0.8rem] ">Mi perfil</h3>}
            <div className="p-6 rounded-lg w-72 flex flex-col gap-2">

              <div className="border-t border-gray-500 w-[25rem]"></div>

              <div className="flex">
                <label className="text-gray-700 font-semibold">Usuario ID: </label>
                <p className="text-gray-500 ml-[1rem]"> {recentData.id}</p>
              </div>

              <div className="border-t border-gray-500 w-[25rem]"></div>

              <div className="flex w-[25rem]">
                <label className="text-gray-700 font-semibold">Nombre: </label>
                <p className="w-[25rem] flex text-gray-500 ml-[1rem]"> {recentData.nombre} {recentData.apellido}</p>
              </div>

              <div className="border-t border-gray-500 w-[25rem]"></div>

              <div className="flex w-[25rem]">
                <label className="text-gray-700 font-semibold">Companía: </label>
                <p className="text-gray-500 ml-[1rem]">{companiaUser.nombre}</p>
              </div>

              <div className="border-t border-gray-500 w-[25rem]"></div>

              <div className="flex text-gray-700 font-semibold w-[25rem]">
                <p className="text-gray-700 font-semibold">ID:</p>
                <p className="text-gray-500 ml-[1rem]"> {recentData.compania_id}</p>
              </div>


              <div className="border-t border-gray-500 w-[25rem]"></div>

            </div>
            <form onSubmit={handleSubmit} className="p-6 rounded-lg w-72 mt-[-3rem]">
              {loggedUser.rol === "Admin" ?

                <div className="flex text-gray-700 font-semibold justify-between items-center mt-2 mb-2 w-[25rem]">
                  <label className="text-gray-700 font-semibold">Email:</label>
                  <div className="flex border-[2px] border-gray-400 rounded-md items-start ml-8 ml-[2rem]">
                    <input
                      className="input bg-white border-gray-300 rounded-md px-4 py-1 w-[18rem] focus:outline-none"
                      type="email"
                      name="email"
                      placeholder={recentData.email}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}

                    />
                  </div>
                </div>

                :
                <div className="flex text-gray-700 font-semibold">
                  <p className="text-gray-700 font-semibold">Email:</p>
                  <p className="text-gray-500 ml-[1rem]"> {recentData.email}</p>
                </div>}
              {/* {touchFields.email && errors.email && <span style={{ color: 'red' }}>{errors.email}</span>} */}

              <div className="border-t border-gray-500 w-[25rem]"></div>

              {loggedUser.id === recentData.id && <div className="flex text-gray-700 font-semibold justify-between items-center mt-2 mb-2 w-[25rem]">
                <label className="text-gray-700 font-semibold">Contraseña:</label>
                <div className="flex border-[2px] border-gray-400 justify-center rounded-md items-start ml-8 ml-[2rem]">
                  <input
                    className="input bg-white   justify-center border-gray-300 rounded-md px-4 py-1 w-[14.8rem] focus:outline-none"
                    type="password"
                    name="contraseña"
                    placeholder='**********'
                    value={formData.contraseña}
                    onChange={handleChange}
                    onBlur={handleBlur}

                  />
                </div>
              </div >}

              {/* {touchFields.contraseña && errors.contraseña && <span style={{ color: 'red' }}>{errors.contraseña}</span>} */}
              {loggedUser.rol === "Admin" ? <div className="flex justify-between items-center my-2 w-[25rem]">
                <label className="text-gray-700 font-semibold">Rol:</label>
                <div className="flex border-[2px] border-gray-400 rounded-md items-start ml-8 ml-[2rem]">
                  <select
                    className='input bg-white justify-center border-gray-300 rounded-md px-4 py-1 w-[14.8rem] focus:outline-none'
                    type=""
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                  >
                    <option value="" className='bold' selected>{recentData.rol}</option>
                    <option value="Cliente" disabled={recentData.rol === "Cliente" ? true : false} selected>Cliente</option>
                    <option value="Operator" disabled={recentData.rol === "Operator" ? true : false} >{`Operator ${recentData.rol === "Operator" ? "  \u2794 Actual" : ""}`}</option>
                    <option value="Admin" disabled={recentData.rol === "Admin" ? true : false}>Admin</option>
                  </select>
                </div>
              </div> :
                <div className='flex justify-between mt-2'>
                  <label className="text-gray-700 font-semibold">Rol</label>
                  <p>{recentData.rol}</p>
                </div>}

              <div className="border-t border-gray-500 w-[25rem]"></div>

              {loggedUser.rol === "Admin" ? <div className="flex justify-between items-center my-2 w-[25rem]">
                <label className="text-gray-700 font-semibold">Estado:  </label>
                <div className="flex border-[2px] border-gray-400 rounded-md items-start ml-8 ml-[2rem]">
                  <select
                    className='input bg-white justify-center border-gray-300 rounded-md px-4 py-1 w-[14.8rem] focus:outline-none'
                    name="activo"
                    value={formData.activo}
                    onChange={handleChange}>

                    <option>{recentData.activo === true ? "Activo" : "Desactivado"}</option>
                    <option disabled={recentData.activo ? true : false} value={true}>Activar</option>
                    <option disabled={recentData.activo ? false : true} value={false} >Desactivar</option>
                  </select>
                </div>
              </div>
                :
                <div className='flex justify-between mt-4'>
                  <label className="text-gray-700 font-semibold">Estado</label>
                  <p>{recentData.activo === true ? "Activo" : "Desactivado"}</p>
                </div>}
              {/* {loggedUser.rol === "Admin" ? <div className="flex justify-between items-center mt-4">
                                <label className="text-gray-700 font-semibold">Activo</label>
                                <input
                                    className='input bg-white justify-center border-gray-300 rounded-md px-4 py-1 w-[14.8rem] focus:outline-none'
                                    type="checkbox"
                                    name="activo"
                                    checked={formData.activo}
                                    onChange={handleChange}
                                />
                            </div>
                                :
                                <div className='flex justify-between mt-4'>
                                    <label className="text-gray-700 font-semibold">Estado</label>
                                    <p>{recentData.activo === true ? "Activo" : "Desactivado"}</p>
                                </div>}
 */}


              {/* {touchFields.compania && errors.compania && <span style={{ color: 'red' }}>{errors.compania}</span>} */}

              {<button className="mt-4 bg-azul hover:bg-dark-azul text-white font-semibold py-2 px-4 rounded-lg w-[25rem]" type="submit" >Editar</button>}
            </form>
          </div>
        </div>
      </div>
  )
}
export default UserEditForm;
