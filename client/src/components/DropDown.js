import '../index.css'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios'

function DropDown({newPageCloseDropdown}) {

    let { userId } = useParams();

    let navigate = useNavigate();

    function viewUserProfile() {
        navigate(`/viewuser/${userId}`)
        newPageCloseDropdown(false)
    }

    const logout = () => {
        Axios.post("https://easy-eats-api.onrender.com/logout", {}, {withCredentials: true})
        sessionStorage.clear();
        navigate('/')
        newPageCloseDropdown(false)
    }

    return(
        <div className="navbar-dropdown">
            <ul className="navbar-dropdown-options">
                <li onClick={()=>viewUserProfile()}>Profile</li>
                <li onClick={()=>logout()}>Log out</li>
            </ul>
        </div>
    )
}

export default DropDown