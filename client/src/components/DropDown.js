import '../index.css'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios'

function DropDown({newPageCloseDropdown}) {

    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            console.log(response)
        })
    }, [])

    let { userId } = useParams();

    function handleClick() {
        navigate(`/viewuser/${userId}`)
        newPageCloseDropdown(false)
    }

    return(
        <div className="navbar-dropdown">
            <ul className="navbar-dropdown-options">
                <li onClick={()=>handleClick()}>Profile</li>
                <li onClick={()=>navigate('/')}>Log out</li>
            </ul>
        </div>
    )
}

export default DropDown