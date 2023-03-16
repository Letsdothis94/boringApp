import { React, useState, useEffect, useRef } from 'react'

function Games() {
    const [games, setGames] = useState([])
    const canvasRef = useRef(null)
    
    useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d") 
      let score = 0
      let speed = 6
      let isGameOver = false
      
      let dino = {
        x: 50,
        y: 150 - 30,
        width: 50,
        height: 50,
        jump: false,
        speed: 0,
        velY: 0,
        grounded: true,
      }
      
      let cactus = {
        x:600,
        y: 150 - 40,
        width: 20,
        height: 40,
      }

      function update() {
        cactus.x -= speed
        if (
          cactus.x + cactus.width > dino.x &&
          cactus.x < dino.x + dino.width &&
          cactus.y + cactus.height > dino.y
          ) {
            isGameOver = true;
          }
          
          dino.velY =+ 1
          dino.y += dino.velY
          if(dino.y > 150 - dino.height) {
          dino.y = 150 - dino.height
          dino.grounded = true
        }
        
        if (cactus.x < -cactus.width) {
          cactus.x = 600
          score += 1
          speed += 1
        }
      }
      
      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillstyle = "#666666"
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height)
        ctx.fillStyle = "#999999"
        ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height)
        ctx.fillStyle = "#333333"
        ctx.d=font = "24px Arial"
        ctx.fillText(`score: ${score}`, 10, 30)
        
        if (isGameOver) {
          ctx.fillStyle = "#FF"
        }
      }
    }, [])
      // let request = async () => {
        //     let req = await fetch(`https://www.freetogame.com/api/games?platform=pc`)
        //     let res = await req.json()
        //     console.log(res)
        // }
        // request()
        
        
  return (
    <canvas ref={canvasRef} width="600px" height="550px" />
  )
}

export default Games