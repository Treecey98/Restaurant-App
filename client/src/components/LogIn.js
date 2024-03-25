import '../index.css'
import { useNavigate } from 'react-router-dom'

function LogIn() {

    let navigate = useNavigate();

    return(
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="login-inputs">
                <label>Email</label> 
                <input type="text"/>
                <label>Password</label>
                <input type="text"/>
                <button className="login-btn">Login</button>
            </div>

            <h4 className="create-profile">If you do not have a profile, please click {<span onClick={()=>navigate('/signup')}>here</span>} to create one.</h4>
        </div>
    )
}

export default LogIn