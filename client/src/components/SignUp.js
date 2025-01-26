import '../index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { FormContainer, TextFieldElement, PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui'
import { Button, Stack } from '@mui/material';

function SignUp() {

    let navigate = useNavigate();

    const[userCreatedMessage, setUserCreatedMessage] = useState('')

    const onSubmit = (data) => {
        Axios.post("https://easy-eats-api.onrender.com/register", (data))
            .then(response => setUserCreatedMessage(response.data.message))

        setTimeout(() => {
            navigate('/');
        }, 800);
    }

    return (
        <>
            <div className="arrow-container">
                    <p className="left-arrow"></p>
                    <button onClick={()=>navigate('/')} className="back-button">Back</button>
                </div> 

            <div className="signup-container">

                <h2 className="signup-title">Sign Up</h2>

                <FormContainer
                    onSuccess={data => onSubmit(data)}
                >  
                    <Stack spacing={2}>
                        <TextFieldElement name="fullname" label="Name" required/>
                        <TextFieldElement name="email" label="Email" required/>
                        <PasswordElement name="password" label='Password' required/>
                        <PasswordRepeatElement passwordFieldName='password' name='password-repeat' label='Repeat Password' required />
                        <TextFieldElement name="address1" label="First line of address" required/>
                        <TextFieldElement name="address2" label="Town" required/>
                        <TextFieldElement name="country" label="Country" required/>
                        <TextFieldElement name="postcode" label="Postcode" required/>
                        <Button type={'submit'} color={'primary'}>
                            Submit
                        </Button>
                    </Stack>
                </FormContainer>
            </div>
            <div className={`user-created-${userCreatedMessage !== '' ? "successfully" : "hide"}`}>
                <h3>{userCreatedMessage}</h3>
            </div>
    
        </>
        )

    }
export default SignUp