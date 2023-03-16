import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import http from './Utils/http'
import introPic from './assets/introPic.jpg'
import city from './assets/city.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function IntroSignup() {
    console.log(introPic)
    const url = city
    const link = `http://localhost:5173${url}`
    console.log(link)

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
        navigate('/intro')
    }


  return (
    <div style={{ border: '1px solid black', display: 'flex', height: '100%' }}>
      <div style={{ width: '42%', border: '1px solid red' }}>
        <div style={{ border: '2px solid purple', borderRadius: '3%', margin: '10px', marginTop: '120px', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <h1>Create account</h1><hr />
            <div>
              <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Enter your Username*" variant="outlined" name='email' onChange={handleChange} style={{ marginTop: '25px', width: '80%', marginBottom: '15px' }} /><br />
                {/* <input name='email' type='text' placeholder='Email Address' onChange={handleChange}></input><br /> */}
                <TextField id="outlined-basic" label="Enter your Password*" variant="outlined" type='password' name='password' onChange={handleChange} style={{ marginTop: '15px', width: '80%', marginBottom: '15px' }} /><br />
                {/* <input name='password' type='password' placeholder='Password' onChange={handleChange}></input><br /> */}
                <Button variant="contained" type='submit' style={{ marginTop: '15px', width: '80%', marginBottom: '15px' }}>Sign up</Button>
                {/* <button>Sign Up</button> */}
                <h3>Already a member? <Link to='/'>Log in</Link></h3>
              </form>
              <p>Copyright © My Website 2023</p>
            </div>
        </div>
      </div>
      <div style={{ width: '58%', border: '1px solid black', backgroundImage: `url(${link})`, height: '100vh', backgroundSize: 'cover' }}>
          <h1 style={{color:'white', textAlign:'center'}}>Join the Bored Community</h1>
      </div>
    </div>
  )
}

export default IntroSignup