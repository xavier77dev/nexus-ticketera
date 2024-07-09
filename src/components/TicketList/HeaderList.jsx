import React from 'react';

const HeaderList = () => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <thead>
      <tr className='w-full flex justify-between text-center px-8 border-b-[1px] border-azul rounded-b-lg'>
        <th className='flex justify-center items-center'>ID</th>
        <th className='flex justify-center items-center'>Estado</th>
        {getloggedUserLS.rol !== "Cliente" && <th className='flex justify-center items-center'>Usuario</th>}
        <th className='flex justify-center items-center'>Prioridad</th>
        <th className='flex justify-center items-center'>Fecha</th>
        <th className='flex justify-center items-center'>Acciones</th>
      </tr>
    </thead>
  );
};

export default HeaderList;
