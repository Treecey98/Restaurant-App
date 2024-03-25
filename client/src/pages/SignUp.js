import '../index.css'

function SignUp() {
    return(
        <div className="signup-container">
            <h2 className="signup-title">Sign Up</h2>
            <div className="signup-inputs">
                <label>Name</label> 
                <input type="text" />
                <label>Email</label>
                <input type="text" />
                <label>Password</label>
                <input type="text" />
                <label>First line of address</label>
                <input type="text" />
                <label>Second line of address</label>
                <input type="text" />
                <label>Postcode</label>
                <input type="text" />

                <button className="signup-btn">Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp