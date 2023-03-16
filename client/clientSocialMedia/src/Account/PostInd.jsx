import { React, useState, useEffect } from 'react'
import UpdatePost from './UpdatePost'

function PostInd({ post }) {
    const url = post.featured_image
    const link = `http://localhost:3000${url}`
    const postId = post.id
    // console.log(postId)

    const deletePost = () => {
      console.log(postId)
      fetch(`http://127.0.0.1:3000/posts/${postId}`, {
        method: 'DELETE',
      })
    }

    const updatePost = () => {
      console.log(postId)
    }

  const [patch, setPatch] = useState(false)
  const updateOn = () => {
    setPatch(!patch)
  }

  return (
    <div>
    {!patch && (
    <div style={{ border: '2px solid purple', borderRadius: '3%', marginTop: '4vh', backgroundColor:'#FCF5E5' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '50%' }}><h3>{post.title}</h3></div>
          <div style={{ flex: '50%', textAlign: 'end', lineHeight: '3', paddingRight: '4px' }}>
            <button onClick={() => { updateOn() }}>🔃</button>
            <button onClick={() => { deletePost() }}>🗑️</button></div>
          </div><hr />
          <p>{post.caption}</p>
          <img src={link} height='380px' width='380px'></img><br />
        </div>
      )}
      { patch && (
        <div style={{ border: '2px solid purple', borderRadius: '3%', marginTop: '4vh', backgroundColor: '#FCF5E5' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '50%' }}><h3>...</h3></div>
            <div style={{ flex: '50%', textAlign: 'end', lineHeight: '3', paddingRight: '4px' }}>
              <button onClick={() => { updateOn() }}>🔃</button>
              <button onClick={() => { deletePost() }}>🗑️</button></div>
          </div><hr />
          <p>...</p>
            <UpdatePost postId={postId}/>
          <img src={link} height='380px' width='380px'></img><br />
        </div>        
      )}
    </div>
  )
}

export default PostInd