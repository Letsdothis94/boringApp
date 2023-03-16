import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Globalchat from '../Chat/Globalchat'
import TextField from '@mui/material/TextField';

function Newsfeed({ currentUser }) {
  const [user, setUser] = useState(currentUser)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const [query, setQuery] = useState([])

  useEffect(() => {
    let request = async () => {
      let req = await fetch(`http://127.0.0.1:3000/posts`)
      let res = await req.json()
      setPosts(res)
    }
    request()
  }, []);

  const bigpicture = (post) => {
    navigate(`/post/${post.id}`)
  }

  const [chat, setChat] = useState(false)
  const openChat = () => {
    setChat(!chat)
  }

  return (
    <div style={{ border: '2px solid purple', marginTop: '8vh' }}>
      <div style={{ border: '2px solid purple', display: 'flex', backgroundColor: '#E8DED1', marginBottom:'2vh' }}>
        <div style={{ width: '33%', lineHeight: '3' }}><button onClick={(openChat)}>Global Chat ☁️</button></div>
        <div style={{ width: '33%', lineHeight: '0', textAlign:'center' }}><h2>NewsFeed</h2></div>
        <div style={{ width: '40%', lineHeight: '3', textAlign:'end' }}>
          <input type='text' placeholder='Search posts...' onChange={(e) => setQuery(e.target.value)} style={{height:'50%', borderRadius:'10px', width:'60%'}}></input>
          <button style={{height:'60%', width:'14%', borderRadius:'8px'}}>👀</button>
        </div>
      </div>
      {!chat && (
        <div style={{ borderLeft: '2px solid purple', borderRight: '2px solid purple', borderRadius: '1%', margin: '4px', marginLeft:'19%', marginRight:'19%' }}>
          {
            posts.filter((post) => 
              post.title.toLowerCase().includes(query)
              ).map((post, i) => {
              return (
                <div key={i}>
                  <Card post={post} bigpicture={bigpicture} />
                </div>
              )
            })
          }
            {/* {
              posts.map((post, i) => {
                return (
                  <div key={i}>
                    <Card post={post} bigpicture={bigpicture} />
                  </div>
                )
              })
            } */}
          </div>
        )}
      {chat && (
        <div style={{ border: '2px solid purple', borderRadius: '2%', marginTop: '2vh', display: 'flex', backgroundColor: '#E8DED1' }}>
          <div style={{border: '2px', borderRadius: '3%', margin: '6px', flex: '50%'}}>
            <div style={{position: '-webkit-sticky', position: 'sticky', top: '8vh'}}>
              <Globalchat currentUser={currentUser}/>
            </div>
          </div>
          <div style={{ borderLeft: '2px solid purple', borderRadius: '2%', margin: '4px', flex: '50%' }}>
            {
              posts.filter((post) =>
                post.title.toLowerCase().includes(query)
              ).map((post, i) => {
                return (
                  <div key={i}>
                    <Card post={post} bigpicture={bigpicture} />
                  </div>
                )
              })
            }
            {/* {
              posts.map((post, i) => {
                return (
                  <div key={i}>
                    <Card post={post} bigpicture={bigpicture} />
                  </div>
                )
              })
            } */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Newsfeed