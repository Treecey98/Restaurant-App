import '../index.css'
import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';

function User() {

    let navigate = useNavigate();

    return (
        <>
           <div className="arrow-container">
                <p className="left-arrow"></p>
                <button onClick={()=>navigate("/home")} className="back-button">Back</button>
            </div> 

            <div className="user-container">
                <h1 className="user-profile-title">User Profile</h1>
                
                <div className='user-details'>
                    <ul>
                        <li>Name: </li>
                        <li>Email: </li>
                        <li>Full Address: </li>
                    </ul>

                    <button className="user-profile-edit-btn">Edit details</button>
                </div>
            </div>
        </>
    )
}

export default User