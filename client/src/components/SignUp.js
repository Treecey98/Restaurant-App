import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Axios from 'axios';

function SignUp() {

    let navigate = useNavigate();

    const { register, handleSubmit }= useForm();

    const onSubmit = (data) => {
        Axios.post("http://localhost:3001/register", (data))

        navigate('/')
    }

    return (
        <div className="signup-container">
            <h2 className="signup-title">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="signup-inputs">
                    <label>Name*</label> 
                    <input {...register("fullname", { required: true})} />
                    <label>Email*</label>
                    <input {...register("email", { required: true})} />
                    <label>Password*</label>
                    <input {...register("password", { required: true})} />
                    <label>First line of address*</label>
                    <input {...register("address1", { required: true})} />
                    <label>District council*</label>
                    <p className="signup-warning">If living in London please put your borough</p>
                    <input {...register("address2", { required: true})} />
                    <label>Postcode*</label>
                    <input {...register("postcode", { required: true})} />

                    <input className="signup-btn" type="submit" />
                </div>
                </form>
        </div>
        )

    }
export default SignUp