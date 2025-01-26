import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, TextField, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginTitle from './LogInTitle';

function LogIn() {

    Axios.defaults.withCredentials = true

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

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

    const[showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return(
        <div>

            <LoginTitle></LoginTitle>

            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <div className="login-inputs">
                <Stack
                    spacing = {2}
                    ml = {10}
                    mr = {10}
                >

                    <TextField
                    label="Email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    />

                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={ showPassword ? 'Hide the password' : 'Display the password'}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        required="true"
                        label="Password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        />
                    </FormControl>

                    <button  className="login-btn" onClick={() => login() }>Login</button>
                </Stack>
                </div>

                <h4 className="create-profile">If you do not have a profile, please click {<span onClick={()=>navigate('/signup')}>here</span>} to create one.</h4>
            </div>
        
            <div className={`login-status-${loginStatus ? "error" : "hide"}`}>
                <h3>{loginStatus}</h3>
            </div>

        </div>
    )
}

export default LogIn