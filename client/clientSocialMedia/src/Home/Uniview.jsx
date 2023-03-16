import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Comments from './Comments'
import NewComments from './NewComment'
import HDlogo from '../assets/HDlogo.png'
import Button from '@mui/material/Button';


function Uniview({ currentUser }) {
    const [postas, setPostas] = useState([])
    const [comments, setComments] = useState([])
    const {id} = useParams()
    const url = postas.featured_image
    const link = `http://localhost:3000${url}`

    useEffect(() => {
        let ws;
        let request = async () => {
            let req = await fetch(`http://127.0.0.1:3000/posts/${id}`)
            let res = await req.json()
            setPostas(res)
        }

        let fetching = async () => {
            let req = await fetch(`http://127.0.0.1:3000/commentsP/${id}`)
            let res = await req.json()
            setComments(res)
        }

        const connect = async () => {
            ws = new WebSocket("ws://localhost:3000/cable")
            ws.onopen = () => {
                console.log("WebSocket for Uniview is Open!")
                ws.send(JSON.stringify({ "command": "subscribe", "identifier": `{ \"channel\": \"LiveCommentsChannel\"}` }))
            }

            ws.onmessage = (event) => {
                const { data } = event;
                let payload = JSON.parse(data);
                if (payload.type === "ping" || payload.type === "message") return;
                let x = JSON.parse(event.data);
                if (x.type === "confirm_subscription") return;
                const post = x?.message?.post
                if (post) {
                    setComments(prevState => {
                        return [...prevState, post]
                    })
                }
            }
        }
        request()
        fetching()
        connect()
    }, []);

  return (
    <div>
        <div style={{ borderTop: '2px solid purple', borderRadius: '3%', display: 'flex', position: 'fixed', top: '0', left: '0', width: '100%', height: '7%', backgroundColor: '#AA336A' }}>
              <div style={{ width: '50%', lineHeight: '2', borderLeft: '2px solid purple' }}><img src={HDlogo} height='100%' width='45%' /></div>
              <div style={{ width: '50%', lineHeight: '3', textAlign: 'end' }}><Button variant="contained"><Link to='/newsfeed'>◀️Go Back</Link></Button></div>
        </div>
    <div style={{ border: '2px solid purple', borderRadius: '3%', marginTop: '10vh', display: 'flex', backgroundColor: '#E8DED1' }}>
        <div style={{ border: '2px', borderRadius: '3%', margin: '6px', flex: '50%', textAlign:'center' }}>
            <img src={link} height='510px' width='500px'></img>
        </div>
        <div style={{ borderLeft: '2px solid purple', borderRadius: '2%', margin: '4px', flex: '50%', position:'relative' }}>
            <div style={{position:'absolute', top:'0', width:'100%'}}>
              <h2>{postas.title}</h2> 
              <h4>{postas.caption}</h4>
              <hr />
                  <h3>Comment Section</h3>
          <div style={{ borderTop: '1px solid #36454F', borderBottom: '1px solid #36454F', height:'214px', overflow:'auto'}}>
                    <Comments comments={comments}/>
                </div>
            </div>
              <div style={{ borderTop: '2px solid #36454F', margin: '5px', position: 'absolute', bottom: '0', width: '100%' }}>
                <NewComments postas={postas} currentUser={currentUser}/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Uniview