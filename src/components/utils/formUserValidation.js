const validateForm = (data, dataCompare) => {

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let errors = {};

  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es requerido';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'El correo electrónico no es válido';
  } else if (dataCompare.some(user => user.email === data.email)) {
    errors.email = 'El correo electrónico ya está en uso';
  }

  if (!data.nombre.trim()) {
    errors.nombre = 'Nombre requerido';
  }
  if (!data.apellido.trim()) {
    errors.apellido = 'Apellido requerido';
  }
  if (!data.compania_id.trim()) {
    errors.compania_id = 'Debe seleccionar una compañía';
  }
  if (data.contraseña.length < 6) {
    errors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
  }

  // Puedes agregar más validaciones aquí según tus requisitos

  return errors;
};

export default validateForm;