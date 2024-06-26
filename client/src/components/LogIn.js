import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import LoginTitle from './LogInTitle'

function LogIn() {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true

    const login = () => {
        Axios.post("https://easy-eats-api.onrender.com/login", {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                navigate(`/home/${response.data[0].id}`)
            }
        })
    }

    useEffect(() => {
        Axios.get("https://easy-eats-api.onrender.com/login").then((response) => {
            console.log(response);
        })
    }, [])

    return(
        <div>

            <LoginTitle></LoginTitle>

            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <div className="login-inputs">
                    <label>Email</label> 
                    <input 
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} 
                    />
                    <button  className="login-btn" onClick={() => login() }>Login</button>
                </div>

                <h4 className="create-profile">If you do not have a profile, please click {<span onClick={()=>navigate('/signup')}>here</span>} to create one.</h4>
            </div>

            <div className="login-status">
                <h3>{loginStatus}</h3>
            </div>

        </div>
    )
}

export default LogIn