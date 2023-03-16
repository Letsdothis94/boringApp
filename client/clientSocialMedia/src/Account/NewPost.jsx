import { React, useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HDlogo from '../assets/HDlogo.png'
import Button from '@mui/material/Button';
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';
import imageIcon from '../assets/imageIcon.png'
import TextField from '@mui/material/TextField';


function NewPost({ currentUser }) {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [userId, setUserId] = useState(currentUser.id)
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('caption', caption)
        formData.append('user_id', userId)
        formData.append('featured_image', image)

        fetch(`http://127.0.0.1:3000/posts`, {
            method: 'POST',
            body: formData
        })
        .catch(error => console.log(error))
        navigate('/profile')
    }

  return (
    <div style={{paddingLeft:'10%', paddingRight:'10%'}}>
        <div style={{ borderTop: '2px solid purple', borderRadius: '3%', display: 'flex', position: 'fixed', top: '0', left: '0', width: '100%', height: '7%', backgroundColor: '#AA336A' }}>
            <div style={{ width: '33%', lineHeight: '2', borderLeft: '2px solid purple' }}><img src={HDlogo} height='100%' width='50%' /></div>
            <div style={{ width: '33%', lineHeight: '1' }}><h2><Link to='/newsfeed'>🏠Home /</Link> <Link to='/news'>📰News</Link></h2></div>
              <div style={{ width: '33%', lineHeight: '3', textAlign: 'end' }}><Button variant="contained"><Link to='/profile'>◀️Go Back</Link></Button>
            </div>
        </div>
          <div style={{ border: '2px solid purple', borderRadius: '3%', marginTop: '9vh', backgroundColor: '#E8DED1', textAlign:'center' }}>
            <h1>Create New Post</h1><hr />
              <img src={imageIcon} />
            <form onSubmit={handleSubmit} style={{textAlign:'center'}}>
                <h2>Select From Computer</h2>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>
                <h3>Add a title</h3>
                {/* <TextField id="standard-basic" label="Type in here..." variant="standard" style={{alignSelf:'center'}}/>  */}
                <input value={title} type="text" placeholder="Enter your title" onChange={(e)=>setTitle(e.target.value)}></input><br />
                <h3>Add a caption</h3>
                <input value={caption} type="text" placeholder="Write a caption..." onChange={(e)=> setCaption(e.target.value)}></input><br />
                <button type='submit'>Share</button>
            </form><hr/>
        </div>
    </div>
  )
}

export default NewPost