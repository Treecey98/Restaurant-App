import '../index.css'
import { useNavigate } from 'react-router-dom';

function DropDown({newPageCloseDropdown}) {

    let navigate = useNavigate();

    function handleClick() {
        navigate('/viewuser/:userId')
        newPageCloseDropdown(false)
    }

    return(
        <div className="navbar-dropdown">
            <ul className="navbar-dropdown-options">
                <li onClick={()=>handleClick()}>Profile</li>
                <li>Log out</li>
            </ul>
        </div>
    )
}

export default DropDown