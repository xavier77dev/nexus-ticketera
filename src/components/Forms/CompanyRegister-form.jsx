import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCompany, getAllCompanies } from "../../redux/actions/companyActions";
import ReactModal from 'react-modal';
import { setFormState } from "../../redux/userSlice";
import Swal from 'sweetalert2';

const CompanyForm = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    nombre: "",
    activo: true,
  })

  const handleSubmitCompany = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Compania creada',
      text: '',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(createCompany(formData))
          .then(() => {
            dispatch(setFormState(false))
            dispatch(getAllCompanies())
            setFormData({
              nombre: "",
              activo: true,
            })
            closeModal()
          });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };




  return (
    <div>


      <div className="flex flex-col mt-[-1rem] ">
        <div className="text-indigo-600 ">
          <a href="#" className=" justify-left underline ml-[0.5rem]" onClick={openModal}>Añadir nueva compañía</a>
          <div >




            <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} className=" flex flex-col justify-center items-center my-[5%]" >
              <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <div className=" flex flex-col justify-right items-end w-full">
                  <button onClick={closeModal} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only ">Close menu</span>

                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-2" >
                  <label className="text-gray-700 font-semibold">Nombre de la compañía</label>
                  <div className="border border-gray-300 rounded-md flex items-center">
                    <input
                      className="input px-2 py-1 w-full focus:outline-none"
                      type="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <label className="text-gray-700 font-semibold">Activar cuenta</label>
                  <input
                    type="checkbox"
                    name="activate"
                    checked={formData.activo}
                    onChange={handleChange => setFormData(prevState => ({ ...prevState, activo: !prevState.activo }))}
                  />
                </div>
                <input type="button" className="mt-6 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-gray-900" value="Enviar" onClick={handleSubmitCompany} />                                </div>
            </ReactModal>
          </div>
        </div>
      </div>

    </div>)
}


export default CompanyForm;
