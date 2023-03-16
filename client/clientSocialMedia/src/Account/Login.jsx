import { HttpStatusCode } from "axios";
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../Utils/http'


function Login() {

    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await http.post("/login", userDetails)
        //change storage to cookies Cookie.set("token", data) 'js-cookie' library
        localStorage.setItem("token", JSON.stringify(data))
        navigate('/newsfeed')
        console.log(data)
    }

    return(
        <div>
            <h1>Login Page</h1><hr />
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Enter your Username' name='email' onChange={handleChange}></input><br />
                    <input type='password' placeholder='Enter your Password' name='password' onChange={handleChange}></input><br />
                    <button>Log in</button>
                    {/* <h3>Don't have an account? Register now! <Link to='/register'>Create account</Link></h3> */}
                </form>
            </div>
        </div>
    )
}

export default Login;