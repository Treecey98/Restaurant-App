import '../index.css'
import DefaultPhoto from '../stockphoto.jpg'
import DropDown from './DropDown'
import { useState } from 'react'

function NavBar() {

    const [open, openDropdown] = useState(false);

    function newPageCloseDropdown(state){
        openDropdown(state)
    }

    return (
       <div className="navbar--container">
            <h1 style={{color: 'white', marginLeft: "10px"}}>EasyEats</h1>
            <img 
                onClick={() => openDropdown((prev) => !prev)}
                src={DefaultPhoto} 
                alt="user" 
                className="user-photo"></img>

            {
                open && <DropDown newPageCloseDropdown={newPageCloseDropdown} />
            }
       </div> 
    )
}

export default NavBar