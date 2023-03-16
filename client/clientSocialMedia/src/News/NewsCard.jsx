import React from 'react'
import Button from '@mui/material/Button';

function NewsCard({ article }) {
  return (
    <div style={{ border: '2px solid grey', borderRadius: '3%', margin: '3px', backgroundColor: '#FCF5E5' }}>
        <div style={{ textAlign: 'center', paddingTop:'3px' }}>
          <img src={article.urlToImage} height='300px' width='500px'/>
        </div>
        <h3>{article.title}</h3>
          {/* <p>{article.description}</p> */}
          {/* <p>{article.publishedAt}</p> */}
        <div style={{ textAlign: 'right', paddingRight:'3px', paddingBottom:'9px' }}>
          <a href={article.url}>
            <Button variant="outlined">Read More</Button>
          </a>
          </div>
    </div>
  )
}

export default NewsCard