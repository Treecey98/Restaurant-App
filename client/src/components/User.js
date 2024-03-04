import '../index.css'
import { useNavigate } from 'react-router-dom';

function User() {

    let navigate = useNavigate();

    return (
        <>
           <div className="arrow-container">
                <p className="left-arrow"></p>
                <button onClick={()=>navigate("/")} className="back-button">Back</button>
            </div> 

            <h1>User Profile</h1>

            <ul>
                <li>Name: </li>
                <li>Email: </li>
                <li>Full Address: </li>
            </ul>
        </>
    )
}

export default User