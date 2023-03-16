import { React, useState, useEffect } from 'react'

function Card({ post, bigpicture }) {
  const url = post.featured_image
  const link = `http://localhost:3000${url}`

  return (
    <div style={{ border: '2px solid purple', borderRadius: '3%', margin: '4px', backgroundColor: '#FCF5E5' }}>
      <h2>{post.title}</h2><hr />
      <div style={{ textAlign: 'center'}}>
        <img src={link} height='500px' width='500px' onClick={()=>{bigpicture(post)}}></img>
      </div>
    </div>
  )
}

export default Card