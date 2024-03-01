import './index.css'
import DefaultPhoto from './stockphoto.jpg'

function NavBar() {
    return (
       <div className="navbar--container">
            <h1 style={{color: 'white', marginLeft: "10px"}}>Restaurant Chooser</h1>
            <img src={DefaultPhoto} alt="user" className="user-photo"></img>
       </div> 
    )
}

export default NavBar