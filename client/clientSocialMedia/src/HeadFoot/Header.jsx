import React from 'react'
import { Link } from 'react-router-dom'
import HDlogo from '../assets/HDlogo.png'

//Byzantium #702963 
//Dark Pink #AA336A <--
//Egg Shell #F0EAD6 <--
//Bone White #F9F6EE
//Charcoal #36454F <--

function Header() {
  return (
    <div style={{ border: '2px solid purple', borderRadius: '3%', display: 'flex', position: 'fixed', top: '0', left: '0', width: '99%', height: '7%', backgroundColor:'#AA336A' }}>
      <div style={{ width: '33%', lineHeight: '2' }}><img src={HDlogo} height='90%' width='50%' /></div>
      <div style={{ width: '33%', lineHeight: '1' }}><h2><Link to='/newsfeed'>🏠Home /</Link> <Link to='/news'>📰News</Link></h2></div>
      <div style={{ width: '33%', lineHeight: '1', textAlign:'end' }}><h2 style={{color:'white'}}><Link to='/profile'>Profile🦊</Link></h2></div>
    </div>
  )
}

export default Header