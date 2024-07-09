import { Navigate } from "react-router-dom";
import UserForm from "../components/Forms/UserRegister-form"


export const UserRegister = () => {

    const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser")) || false;
    return (
        <>
            {getloggedUserLS && getloggedUserLS.rol == "Admin" ?


                <div className="grid grid-cols-1 md:grid-cols-1">
                    {/* <CompanyForm/> */}
                    <UserForm />

                </div>

                :
                <Navigate to="/login" />
            }
        </>
    );
};
