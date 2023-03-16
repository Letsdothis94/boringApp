import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdatePost({ postId}) {
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', title)
      formData.append('caption', caption)

      fetch(`http://127.0.0.1:3000/posts/${postId}`, {
        method: 'PATCH',
        body: formData
      })
        .catch(error => console.log(error))
      navigate('/profile')
    }
  return (
    <div style={{ border: '2px solid ', borderBottomRadius: '3%', backgroundColor: '#AA336A', marginTop: '6.5vh' }} >
      <h1 style={{textAlign:'center'}}> UpdatePost</h1>
      <div style={{ border: '2px solid purple', borderRadius: '3%', margin: '4px', backgroundColor: '#FCF5E5' }}>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}> 
          <h3>Update title</h3>
          <input value={title} type="text" placeholder="Enter your title" onChange={(e) => setTitle(e.target.value)}></input><br />
          <h3>Update caption</h3>
          <input value={caption} type="text" placeholder="Write a caption..." onChange={(e) => setCaption(e.target.value)}></input><br />
          <button type='submit'>Share</button>
        </form><hr />
      </div>
    </div>
  )
}

export default UpdatePost