import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../Utils/http'

function Signup() {

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
        e.preventDefault()
        const { data } = await http.post("/signup", userDetails)
        // console.log(data)
        // navigate('/')
    }

  return (
      <div style={{ border: '2px solid purple', borderRadius: '3%', marginTop: '8vh' }}>
          <h1>Sign Up Form</h1>
          <hr />
          <div>
              <form onSubmit={handleSubmit}>
                  <input name='email' type='text' placeholder='Email Address' onChange={handleChange}></input><br />
                  <input name='password' type='password' placeholder='Password' onChange={handleChange}></input><br />
                  <button>Sign Up</button>
                  {/* <h3>Already a member? <Link to='/login'>Log in</Link></h3> */}
              </form>
          </div>
      </div>
  )
}

export default Signup