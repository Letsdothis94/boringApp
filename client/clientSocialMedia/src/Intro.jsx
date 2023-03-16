import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import http from './Utils/http'
import introPic from './assets/introPic.jpg'
import introcolorjpg from './assets/introcolor.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Intro() {
  const url = introcolorjpg
  const link = `http://localhost:5173${url}`

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

  return (
    <div style={{border:'5px solid black', display:'flex', height:'100vh'}}>
      <div style={{ width: '55%', border: '1px solid red', backgroundImage: `url(${link})`, height:'100vh', backgroundSize:'cover' }}>
        <h1 style={{color:'white'}}>The boring App!</h1>
        <h2 style={{ color: 'white' }}>Welcome</h2><br />
        <h3></h3>
      </div>
      <div style={{ width: '45%', border: '1px solid red' }}>
        <div style={{ border: '2px solid purple', borderRadius: '3%', margin: '10px', marginTop:'100px', textAlign:'center', paddingTop:'10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor:'secondary.main'}}>
            <LockOpenIcon />
          </Avatar>
          </div>
          <h1>Login to continue</h1><hr />
          <div>
            <form onSubmit={handleSubmit}>
              {/* <h3>Username:</h3> */}
              <TextField id="outlined-basic" label="Enter your Username*" variant="outlined" name='email' onChange={handleChange} style={{ marginTop: '25px', width: '80%', marginBottom:'15px' }}/><br />
              {/* <input type='text' placeholder='Enter your Username' name='email' onChange={handleChange}></input><br /> */}
              {/* <h3>Password:</h3> */}
              <TextField id="outlined-basic" label="Enter your Password*" variant="outlined" type='password' name='password' onChange={handleChange} style={{ marginTop: '15px', width: '80%', marginBottom: '15px' }} /><br />
              {/* <input type='password' placeholder='Enter your Password' name='password' onChange={handleChange}></input><br /> */}
              {/* <button>Log in</button> */}
              <Button variant="contained" type='submit' style={{ marginTop: '15px', width: '80%', marginBottom: '15px' }}>Log in</Button>
              <h3>Don't have an account? <Link to='/introSignup'>Sign up!</Link></h3>
            </form>
              <p>Copyright © My Website 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Intro