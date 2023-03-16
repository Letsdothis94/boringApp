import { React, useState } from 'react'

function Comments({ comments }) {
   

  return (
      <div>
        {
            comments.map((comment, i) => {
                return(
                    <div key={i} style={{ border: '2px solid #36454F', borderRadius: '3%', margin: '1px', backgroundColor:'#F0EAD6' }}>
                        <p>- {comment.content}</p>
                    </div>
                )
            })
        }

    </div>
  )
}

export default Comments