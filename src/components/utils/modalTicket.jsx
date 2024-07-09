import { useDispatch } from "react-redux";
import { setModalOpen, setSelectedTicket } from "../../redux/tourStore/ticketSlice";

export const ModalTicket = ({selectedTicket}) => {

    const dispatch = useDispatch();


    const closeTicketModal = () => {
        dispatch(setSelectedTicket(null));
        dispatch(setModalOpen(false));
      };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md xl:w-1/3 2xl:h-2/4">
                <button
                    onClick={closeTicketModal}
                    className="absolute top-0 right-0 m-4"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Detalle del Ticket</h2>
                <div className="flex gap-8 py-4">
                    <div className="w-1/2 text-left">
                        <p>ID Ticket: {selectedTicket.id}</p>
                        <p>Fecha de creación: {selectedTicket.createdAt}</p>
                        <p>Fecha de modificación: {selectedTicket.updatedAt}</p>
                    </div>
                    <div className="w-1/2 text-left">
                        <p>Estado: {selectedTicket.estado}</p>
                        <p>Usuario: {selectedTicket.usuario_id}</p>
                        <p>Prioridad: {selectedTicket.prioridad}</p>
                    </div>
                </div>
                {/* Incidencia */}
                <div className="text-left">
                    <b>Incidencia:</b>
                    <div className=" h-14 bg-slate-300 px-4 rounded-xl">
                        <p>{selectedTicket.incidencia}</p>
                    </div>
                </div>
                {/* Notas */}
                <div className="text-left">
                    <b>Notas:</b>
                    <div className=" h-14 bg-slate-300 px-4 rounded-xl">
                        <p> {selectedTicket.diagnostico}</p>
                    </div>
                </div>
                {/* Diagnostico */}
                <div className="text-left">
                    <b>Diagnóstico:</b>
                    <div className=" h-14 bg-slate-300 px-4 rounded-xl">
                        <p> {selectedTicket.diagnostico}</p>
                    </div>
                </div>
                <button
                    onClick={closeTicketModal}
                    className="bg-gray-400 mt-4 px-4 py-2 rounded-md"
                >
                    Cerrar
                </button>{" "}
                {/* Botón para cerrar el modal */}
            </div>
        </div>
    )
}
