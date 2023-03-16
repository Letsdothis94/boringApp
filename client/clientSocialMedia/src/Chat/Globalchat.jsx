import { React, useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Globalchat({ currentUser }) {

    const [user, setUser] = useState(currentUser)
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        let ws;
        const request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/messages`)
            let res = await req.json()
            setChat(res)
        }

        const connect = async () => {
            ws = new WebSocket("ws://localhost:3000/cable")
            ws.onopen = () => {
                console.log("WebSocket for Chat is Open!")
                ws.send(JSON.stringify({ "command": "subscribe", "identifier": `{ \"channel\": \"LiveChatChannel\"}` }))
            }

            ws.onmessage = (event) => {
                const { data } = event;
                let payload = JSON.parse(data);
                if (payload.type === "ping" || payload.type === "message") return;
                let x = JSON.parse(event.data);
                if (x.type === "confirm_subscription") return;
                const post = x?.message?.post
                if (post) {
                    setChat(prevState => {
                        return [...prevState, post]
                    })
                }
            }
        }
        request()
        connect()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: message,
                user_id: user.id,
                username: user.email
            })
        })
        let res = await req.json()
        console.log(res)
    }

  return (
      <div style={{ border: '2px solid purple', borderRadius: '3%', marginTop: '8vh', backgroundColor: '#AA336A' }}>
          <div style={{ backgroundColor: '#AA336A' }}>
            <h1>Global Chat</h1>
          </div>
          <div style={{ borderTop: '2px solid purple', borderRadius: '3%', backgroundColor: '#FCF5E5' }}>
              {/* <h2>Coming Soon....</h2><hr /> */}
              <div style={{ borderBottom: '2px solid purple', borderRadius: '8%', overflow:'auto', height:'300px' }}>
                <h4>Welcome to our global chat...</h4>
                  {//add message to create account if there's no token available
                      chat.map((x, i) => {
                          console.log(x)
                          return (
                              <div key={i} style={{display:'flex'}}>
                                  <p style={{fontWeight:'bold'}}>{x.username}</p>
                                  <p style={{ fontStyle: 'italic' }}>: {x.content} </p>
                              </div>
                          )
                      })
                  }
              </div>
              <div style={{ backgroundColor:'#F0EAD6'}}>
                  {/* <input type="text" name="chat" placeholder="Enter chat...." onChange={(e) => setMessage(e.target.value)} /> */}
                  {/* <button type="submit" onClick={handleSubmit}>Send</button> */}
                  <TextField id="filled-basic" label="Enter chat..." variant="filled" name="chat" onChange={(e) => setMessage(e.target.value)} style={{width:'100%'}} /><br/>
                  <Button variant="contained" type="submit" onClick={handleSubmit} style={{ width: '100%' }}>Send</Button>
                  {/* <Button variant='contained'>Clear Chat -- Optional</Button> */}
              </div>
          </div>
      </div>
  )
}

export default Globalchat