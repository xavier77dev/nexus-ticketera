import useDate from "../../helpers/useDate";

export default function InfoTicketUserRol({editTicket, rol}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-5 sm:p-10 font-poppins">
        <h3 className="text-2xl font-bold mb-7 text-gray-900 text-left w-full">Información del Ticket</h3>

        <hr className="w-full text-dark-azul border-t-1 border-azul mb-3"/>

        {
          (["Admin", "Operator"].includes(rol)) &&
            <>
              <div className="text-gray-900 sm:flex justify-between items-center w-full gap-4 flex-wrap">
                <p className="font-semibold">Usuario ID:</p>
                <p className="text-gray-900 border border-gris rounded-lg sm:w-[200px] text-center text-[14px] flex justify-center">{editTicket.usuario_id}</p>
              </div>
              <hr className="w-full text-dark-azul border-t-1 border-azul m-3"/>
            </>
        }

        {
          ["Admin", "Operator", "Cliente"].includes(rol) &&
            <>
              <div className="text-gray-900 sm:flex justify-between items-center w-full gap-4 flex-wrap">
                <p className="font-semibold">Ticket ID:</p>
                <p className="text-gray-900 border border-gris rounded-lg text-center sm:w-[200px] text-[14px]  
                py-[1px] flex justify-center">{editTicket.id}</p>
              </div>
              <hr className="w-full text-dark-azul border-t-1 border-azul m-3"/>
 
              <div className="text-gray-900 sm:flex justify-between items-center w-full gap-4 flex-wrap">
                <p className="font-semibold">Creado:</p>
                <p className="text-gray-900 border border-gris rounded-lg sm:w-[200px] text-center text-[14px] flex justify-center
                 py-[1px]">
                  {useDate(new Date(editTicket.createdAt))}
                </p>
              </div>
              <hr className="w-full text-dark-azul border-t-1 border-azul m-3"/>

              <div className="text-gray-900 sm:flex justify-between items-center w-full gap-4 flex-wrap">
                <p className="font-semibold">Modificado:</p>
                <p className="text-gray-900 border border-gris rounded-lg sm:w-[200px] text-center text-[14px] flex justify-center
                 py-[1px]">
                  {useDate(new Date(editTicket.updatedAt))}
                </p>
              </div>
              <hr className="w-full text-dark-azul border-t-1 border-azul mt-3"/>

              {
                (editTicket.incidencia !== null && editTicket.incidencia.length > 0) &&
                  <div className="text-gray-900 flex flex-col sm:flex justify-between items-center w-full gap-1 flex-wrap mt-3">
                    <p className="font-semibold text-left w-full">Incidencia:</p>
                    <p className=" text-gray-900 border border-gris rounded-lg w-[310px] text-[14px] py-[1px] px-4">
                      {editTicket.incidencia}
                    </p>
                  </div>
              }
            </>
        }
        

        {
          ((editTicket.nota != null && editTicket.nota.length > 0) && rol !== "Cliente") &&
            <div className="text-gray-900 flex flex-col sm:flex justify-between items-center w-full gap-1 flex-wrap mt-3">
              <p className="font-semibold text-left w-full">Notas:</p>
              <p className=" text-gray-900 border border-gris rounded-lg w-[310px] text-[14px] py-[1px] px-4">
                {editTicket.nota}
              </p>
            </div>
        }

        {
          (editTicket.diagnostico != null && editTicket.diagnostico.length > 0) &&
          <div className="text-gray-900 flex flex-col sm:flex justify-between items-center w-full gap-1 flex-wrap mt-3">
            <p className="font-semibold text-left w-full">Diagnóstico:</p>
            <p className=" text-gray-900 border border-gris rounded-lg w-[310px] text-[14px] py-[1px] px-4">
              {editTicket.diagnostico}
            </p>
          </div>
        }
      </div>
    </>
    
  )
}
