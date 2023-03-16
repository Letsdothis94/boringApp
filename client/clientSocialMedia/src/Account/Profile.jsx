import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PostInd from './PostInd'
import Todolist from '../Todo/Todolist'

function Profile({ currentUser }) {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(currentUser)
    const [userId, setUserId] = useState(currentUser.id)
    const [userPosts, setUserPosts] = useState([])

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        let ws;
        let request = async () => {
            let req = await fetch(`http://127.0.0.1:3000//postsU/${userId}`)
            let res = await req.json()
            setUserPosts(res)
        }

        const connect = async () => {
            ws = new WebSocket("ws://localhost:3000/cable")
            ws.onopen = () => {
                console.log("WebSocket for Chat is Open!")
                ws.send(JSON.stringify({ "command": "subscribe", "identifier": `{ \"channel\": \"LiveProfileChannel\"}` }))
            }

            ws.onmessage = (event) => {
                const { data } = event;
                let payload = JSON.parse(data);
                if (payload.type === "ping" || payload.type === "message") return;
                let x = JSON.parse(event.data);
                if (x.type === "confirm_subscription") return;
                const post = x?.message?.destroy
                const add = x?.message?.post
                if (post) {
                    setUserPosts(prevState => {
                        return [...prevState.filter((x) => {return x.id !== post.id} )]
                        // setUserPosts(...prevState.filter((x) => {
                        //      return [x.id !== post.id ]}))
                    })
                }
                else if (add) {
                    setUserPosts(prevState => {
                        return [...prevState, add]
                    })
                }
            }
        }
        request()
        connect()
    }, []);

    const [todo, setTodo] = useState(false)
    console.log(todo)
    const todoOn = () => {
        setTodo(!todo)
    }

  return (
      <div style={{ border: '2px solid ', borderBottomRadius: '3%', backgroundColor:'#AA336A', marginTop:'6.5vh' }}>
          <div style={{ border: '2px solid ', borderRadius: '3%', marginTop: '12px', backgroundColor: '#E8DED1' }}>
              <h1>Profile:</h1>
              {/* <h5>Profile Pic</h5> */}
              <h2>Username: {userData.email}</h2>
              <button onClick={() => { todoOn() }} >To-Do ➕</button>
              <hr />
              {todo && (
                <Todolist />
              )}
              <div>
                  <h3 style={{textAlign:'center'}}>All your posts here:</h3><hr />
                  <div style={{display:'flex', justifyContent:'space-evenly' }}>
                    {
                        userPosts.map((post, i) => {
                            return(
                                <div key={i}>
                                    <PostInd post={post}/>
                                </div>
                            )
                        })
                    }
                  </div>
                  <h3 style={{textAlign:'center'}}>Hi!🖐️</h3>
              </div>    
          </div>
      </div>
  )
}

export default Profile