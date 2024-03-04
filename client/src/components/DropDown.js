import '../index.css'
import { useNavigate } from 'react-router-dom';

function DropDown() {

    let navigate = useNavigate();

    return(
        <div className="navbar-dropdown">
            <ul className="navbar-dropdown-options">
                <li onClick={()=>{navigate('/viewuser/:userId')}}>Profile</li>
                <li>Log out</li>
            </ul>
        </div>
    )
}

export default DropDown