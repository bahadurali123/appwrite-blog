import { useDispatch } from "react-redux"
import authService from "../../../appwrite/auth.service"
import { logout } from "../../store/authslice"

function LogoutBtn() {
    const dispatch = useDispatch();
    const Logouthandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            });
    }

    return (
        <button
            className='inline-bock px-6 py-2 text-cyan-950 hover:text-red-800 duration-200 rounded-full'
            onClick={Logouthandler}
        >Logout</button>
    )
}

export default LogoutBtn