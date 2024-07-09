import { useState } from "react";

export const AlertDialog = () => {
    const [isAlertVisible, setAlertVisible] = useState(false);


    const handleShowAlert = () => {
        setAlertVisible(true);
    };

    const handleCancel = () => {
        setAlertVisible(false);
    };

    const handleConfirm = () => {
        // Aquí puedes agregar la lógica que deseas realizar cuando el usuario confirma la alerta
        setAlertVisible(false);
    };

    const Alert = ({ title, message, onCancel, onConfirm, confirmtext, canceltext }) => {
        useEffect(() => {
            Swal.fire({
                title: title,
                text: message,
                icon: 'success',
                confirmButtonText: confirmtext,
                cancelButtonText: canceltext,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    onConfirm();
                    handleConfirm()

                } else if (result.isDismissed) {
                    onCancel();
                    handleCancel()
                }
            });

            // Limpia la alerta al desmontar el componente
            return () => {
                Swal.close();
            };
        }, [title, message, onCancel, onConfirm, confirmtext, canceltext]);

        // No es necesario devolver nada ya que Swal.fire() se maneja dentro del useEffect
        return null;


    }
}