import '../index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

function User() {

    let navigate = useNavigate();

    let {userId} = useParams();
    
    let [fullname, setName] = useState('')
    let [email, setEmail] = useState('')
    let [fulladdress, setAddress] = useState('')

    useEffect(() => {
        Axios.get(`http://localhost:3001/userDetails/${userId}`).then((response) => {
            setName(response.data[0].name)
            setEmail(response.data[0].email)

            const address1 = response.data[0].address1;
            const address2 = response.data[0].address2;
            const postcode = response.data[0].postcode

            const address = `${address1}, ${address2}, ${postcode}`

            setAddress(address)
        })
    }, []);
    
    let [disabledStatus, setDisabled] = useState(true);
    let [disabledStatus2, setDisabled2] = useState(true);
    let [disabledStatus3, setDisabled3] = useState(true);

    return (
        <>
           <div className="arrow-container">
                <p className="left-arrow"></p>
                <button onClick={()=>navigate(`/home/${userId}`)} className="back-button">Back</button>
            </div> 

            <div className="user-container">
                <h1 className="user-profile-title">{fullname}'s Profile</h1>
                
                <div className="user-details-container">
                    <div className="e-disabled">
                        
                        <ul>
                            <div className='user-details'>
                                <li>Name: <input 
                                    type="text" 
                                    value={fullname} 
                                    onChange={e => setName(e.target.value) }
                                    disabled = {disabledStatus}/>
                                </li>
                                <EditIcon style={{ fontSize: 25, color: "#80A1C1"}} onClick={() => setDisabled(!disabledStatus)}>Filled</EditIcon>
                            </div>

                            <div className='user-details'>
                                <li>Email: <input 
                                    type="text" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value) }
                                    disabled={disabledStatus2} /></li>
                                <EditIcon style={{ fontSize: 25, color: "#80A1C1"}} onClick={() => setDisabled2(!disabledStatus2)}>Filled</EditIcon>
                            </div>
                            
                            <div className='user-details'>
                                <li>Address: <input 
                                    type="text" 
                                    value={fulladdress} 
                                    onChange={e => setAddress(e.target.value) }
                                    disabled={disabledStatus3} /></li>
                                <EditIcon style={{ fontSize: 25, color: "80A1C1"}} onClick={() => setDisabled3(!disabledStatus3)}>Filled</EditIcon>
                            </div> 
                            
                        </ul> 
                    
                    </div>
                    <button className="user-profile-edit-btn">Save details</button>
                </div>
            </div>
            
        </>
    )
}

export default User