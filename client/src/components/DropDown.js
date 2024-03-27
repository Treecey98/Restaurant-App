import '../index.css'
import { useNavigate, useParams } from 'react-router-dom';

function DropDown({newPageCloseDropdown}) {

    let navigate = useNavigate();

    let { userId } = useParams();

    console.log(userId);

    function handleClick() {
        navigate(`/viewuser/${userId}`)
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