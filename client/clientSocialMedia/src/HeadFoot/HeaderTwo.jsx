import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HDlogo from '../assets/HDlogo.png'
import Button from '@mui/material/Button';

function HeaderTwo() {
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const newPost = () => {
    navigate('/newpost')
  }

  return (
    <div style={{ borderTop: '2px solid purple', borderRadius: '3%', display: 'flex', position: 'fixed', top: '0', left: '0', width: '100%', height: '7%', backgroundColor: '#AA336A' }}>
      <div style={{ width: '33%', lineHeight: '2', borderLeft:'2px solid purple' }}><img src={HDlogo} height='100%' width='50%' /></div>
      <div style={{ width: '33%', lineHeight: '1' }}><h2><Link to='/newsfeed'>🏠Home /</Link> <Link to='/news'>📰News</Link></h2></div>
      <div style={{ width: '33%', lineHeight: '3', textAlign: 'end' }}>
        <Button variant="contained" onClick={() => { newPost() }} style={{ marginTop: '15px', width: '20%', marginBottom: '15px' }}>ADD</Button>
        <Button variant="contained" onClick={() => { logout() }} style={{ marginTop: '15px', width: '45%', marginBottom: '15px' }}>Log Out</Button>
        {/* <button onClick={() => { logout() }} >Log Out</button> */}
      </div>
    </div>
  )
}

export default HeaderTwo;