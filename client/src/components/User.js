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
    let [address1, setAddress1] = useState('')
    let [address2, setAddress2] = useState('')
    let [postcode, setPostcode] = useState('')

    let[fullAddress, setFullAddress] = useState({})

    useEffect(() => {
        Axios.get(`http://localhost:3001/userDetails/${userId}`).then((response) => {
            setName(response.data[0].name)
            setEmail(response.data[0].email)
            setAddress1(response.data[0].address1)
            setAddress2(response.data[0].address2)
            setPostcode(response.data[0].postcode)

            setFullAddress({
                address: `${response.data[0].address1}, ${response.data[0].address2}, ${response.data[0].postcode}`
            })
        })
    }, []);

    const updateUserDetails = () => {
        Axios.put(`http://localhost:3001/updateUserDetails/${userId}`, {
            fullname: fullname,
            email: email,
            address1: address1,
            address2: address2,
            postcode: postcode,
        })
    }
    
    let [disabledStatus, setDisabled] = useState(true);
    let [disabledStatus2, setDisabled2] = useState(true);
    let [disabledStatus3, setDisabled3] = useState(true);
    let [disabledStatus4, setDisabled4] = useState(true);
    let [disabledStatus5, setDisabled5] = useState(true);

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
                                <li>First line of address: <input 
                                    type="text" 
                                    value={address1} 
                                    onChange={e => setAddress1(e.target.value) }
                                    disabled={disabledStatus3} /></li>
                                <EditIcon style={{ fontSize: 25, color: "80A1C1"}} onClick={() => setDisabled3(!disabledStatus3)}>Filled</EditIcon>
                            </div> 

                            <div className='user-details'>
                                <li>District council / Borough: <input 
                                    type="text" 
                                    value={address2} 
                                    onChange={e => setAddress2(e.target.value) }
                                    disabled={disabledStatus4} /></li>
                                <EditIcon style={{ fontSize: 25, color: "80A1C1"}} onClick={() => setDisabled4(!disabledStatus4)}>Filled</EditIcon>
                            </div> 

                            <div className='user-details'>
                                <li>Postcode: <input 
                                    type="text" 
                                    value={postcode} 
                                    onChange={e => setPostcode(e.target.value) }
                                    disabled={disabledStatus5} /></li>
                                <EditIcon style={{ fontSize: 25, color: "80A1C1"}} onClick={() => setDisabled5(!disabledStatus5)}>Filled</EditIcon>
                            </div> 

                            <div className='user-details'>
                                <li>Full address: <input 
                                    type="text" 
                                    value={fullAddress.address}
                                    disabled={true}/></li>
                            </div> 
                            
                        </ul> 
                    
                    </div>
                    <button className="user-profile-edit-btn" onClick={() => updateUserDetails()}>Save details</button>
                </div>
            </div>
            
        </>
    )
}

export default User