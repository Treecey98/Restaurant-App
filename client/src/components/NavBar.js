import '../index.css'
import DefaultPhoto from '../stockphoto.jpg'
import DropDown from './DropDown'
import { useState } from 'react'

function NavBar() {

    const [open, openDropdown] = useState(false);

    return (
       <div className="navbar--container">
            <h1 style={{color: 'white', marginLeft: "10px"}}>Restaurant Chooser</h1>
            <img 
                onClick={() => openDropdown((prev) => !prev)}
                src={DefaultPhoto} 
                alt="user" 
                className="user-photo"></img>

            {
                open && <DropDown />
            }
       </div> 
    )
}

export default NavBar