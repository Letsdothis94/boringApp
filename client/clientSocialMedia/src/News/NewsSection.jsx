import { height } from '@mui/system';
import { React, useState, useEffect } from 'react';
import NewsCard from './NewsCard';

function NewsSection({ currentUser }) {
    const [user, setUser] = useState(currentUser)
    const API_KEY = `440c4a659097468e9f46a5ffebd93d47`;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    const [news, setNews] = useState([])
    const [currentWeather, setCurrentWeather] = useState([])
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`

    useEffect(() => {
        let request = async () => {
            let req = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
            let res = await req.json()
            setNews(res.articles)
        }
        request()
    }, [])

    useEffect(() => {
        const weatherData = async () => {
            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`)
                const data = await res.json()
                setCurrentWeather(data.current_weather)
            }catch(error) {
                console.error(error)
            }
        }
        weatherData()
    },[])
  return (
    <div style={{ marginTop: '9vh' }}>
        <div style={{ borderRadius: '3%', display: 'flex', left: '0', width: '100%'}}>
            <div style={{ width: '30%', lineHeight: '1' }}><h2>Welcome, {user.email}</h2><p style={{textDecoration:'underline', fontStyle:'italic', fontSize:'large' }}>Date: {date}</p>
            </div>
            <div style={{ width: '30%', lineHeight: '1' }}></div>
              <div style={{ width: '12%', lineHeight: '1' }}></div>
              <div style={{ width: '27%', lineHeight: '2', display:'flex', border:'1px solid grey', borderRadius:'7px', backgroundColor:'white', boxShadow:'5px 2px #888888', paddingLeft:'1px' }}>
                <h2>{currentWeather.temperature}</h2>
                <h3> °F</h3>
                <div style={{width:'50%', textAlign:'right'}}>
                    <h2>New York</h2>
                </div>
            </div>
        </div>
          <div style={{ borderRadius: '1%', margin: '4px', marginLeft: '19%', marginRight: '19%' }}>
            {/* <h2>Articles here</h2> */}
                {
                    news.map((article, i )=>{
                        return(
                            <div key={i} style={{paddingTop:'10px', paddingBottom:'10px'}}>
                                <NewsCard article={article}/>
                            </div>
                        )
                    })
                }
          </div>
    </div>
  )
}

export default NewsSection