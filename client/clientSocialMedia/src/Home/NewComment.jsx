import { React, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function NewComment({ postas, currentUser }) {
    
    const [usuario, setUsuario] = useState(currentUser)
    const [content, setContent] = useState('')

    
    function addcomment(e){
        e.preventDefault()
        fetch(`http://127.0.0.1:3000/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: content,
                post_id: postas.id,
                user_id: usuario.id
            })
        })
    }

  return (
    <div>
        <form onSubmit={addcomment}>
            <TextField id="filled-basic" label='Enter your comment...' variant="filled" value={content} onChange={(e) => setContent(e.target.value)} style={{width:'99%'}}/>
            {/* <input type='text' value={content} placeholder='Enter your comment...' onChange={(e)=> setContent(e.target.value)}
            style={{width:'90%', height:'30px'}}/> */}
            <Button type='submit' variant="contained" style={{width:'99%', marginTop:'5px'}}>Send</Button>
            {/* <button type='submit'>Send</button> */}
        </form>
    </div>
  )
}

export default NewComment