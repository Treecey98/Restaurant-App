import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [postcode, setPostcode] = useState('');


    let navigate = useNavigate();

    return(
        <div className="signup-container">
            <h2 className="signup-title">Sign Up</h2>
            <div className="signup-inputs">
                <label>Name</label> 
                <input 
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <label>Email</label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label>Password</label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                />
                <label>First line of address</label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setAddress1(e.target.value)
                    }}
                />
                <label>Second line of address</label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setAddress2(e.target.value)
                    }} 
                />
                <label>Postcode</label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setPostcode(e.target.value)
                    }}
                />

                <button className="signup-btn" onClick={() => navigate('/home')}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp