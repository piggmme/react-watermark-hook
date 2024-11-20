import { useEffect, useState } from 'react'
import './App.css'
import useWatermark from '../lib/useWatermark'

function App () {
  const [count, setCount] = useState(0)
  const [watermarkText, setWatermarkText] = useState(`Watermark ${new Date().toISOString()}`)

  useEffect(() => {
    setInterval(() => {
      setWatermarkText(`Watermark ${new Date().toISOString()}`)
    }, 3000)
  }, [])

  const { ref } = useWatermark(watermarkText, {
    opacity: 0.3,
    angle: -25,
    gap: 10,
    size: 300,
    color: '#ff0000',
  })

  return (
    <>
      <h1>React Watermark Hook</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
      <div
        ref={ref}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
        }}
      />
    </>
  )
}

export default App
