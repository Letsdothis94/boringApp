import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Login from './Account/Login'
import Profile from './Account/Profile'
import Signup from './Account/Signup'
import Newsfeed from './Home/Newsfeed'
import Globalchat from './Chat/Globalchat'
import Intro from './Intro'
import IntroSignup from './IntroSignup'
import NewPost from './Account/NewPost'
import Uniview from './Home/Uniview'
import Header from './HeadFoot/Header'
import HeaderTwo from './HeadFoot/HeaderTwo'
import NewsSection from './News/NewsSection'
import Games from './Gaming/Games'
import UpdatePost from './Account/UpdatePost'
import Todolist from './Todo/Todolist'

let logged;
if (localStorage.token) {
  const jwt = localStorage.getItem('token')
  logged = jwtDecode(jwt)
}

function App() {
  const [currentUser, setCurrentUser] = useState(logged)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let request = async () => {
      let req = await fetch(`http://127.0.0.1:3000/posts`)
      let res = await req.json()
      setPosts(res)
    }
    request()
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/profile'} element={<><HeaderTwo/> <Profile currentUser={currentUser} /> </>} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/newsfeed'} element={<><Header /> <Newsfeed currentUser={currentUser} /> </>} />
          <Route path={'/chat'} element={<Globalchat currentUser={currentUser} />} />
          <Route path={'/'} element={<Intro />} />
          <Route path={'/introSignup'} element={<IntroSignup />} />
          <Route path={'/newpost'} element={<NewPost currentUser={currentUser}/>} />
          <Route path={'/post/:id'} element={<Uniview currentUser={currentUser}/>} />
          <Route path={'/news'} element={<><Header /> <NewsSection currentUser={currentUser} /> </>} />
          <Route path={'/games'} element={<Games />} />
          <Route path={'/update'} element={<UpdatePost/> } />
          <Route path={'/todo'} element={<Todolist />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
