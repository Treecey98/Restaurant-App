import '../index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Axios from 'axios';

function User() {

    let navigate = useNavigate();

    let {userId} = useParams();

    let [user, setUserDetails] = useState({})

    useEffect(() => {
        Axios.get(`http://localhost:3001/userDetails/${userId}`).then((response) => {
            setUserDetails({
                fullname: response.data[0].name,
                email: response.data[0].email,
                address1: response.data[0].address1,
                address2: response.data[0].address2,
                postcode: response.data[0].postcode,
            }) 
        })
    }, []);

    const fulladdress = `${user.address1}, ${user.address2}, ${user.postcode}` 

    return (
        <>
           <div className="arrow-container">
                <p className="left-arrow"></p>
                <button onClick={()=>navigate(`/home/${userId}`)} className="back-button">Back</button>
            </div> 

            <div className="user-container">
                <h1 className="user-profile-title">User Profile</h1>
                
                <div className='user-details e-disabled'>
                    
                    <ul>
                        <li>Name: <input type="text" value={user.fullname} disabled={true} /> </li>
                        <li>Email: <input type="text" value={user.email} disabled={true} /> </li>
                        <li>Address: <input type="text" value={fulladdress} disabled={true} /> </li>
                    </ul> 

                    <button className="user-profile-edit-btn">Save details</button>
                </div>
            </div>
        </>
    )
}

export default User