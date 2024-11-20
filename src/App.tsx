import { useState } from 'react'
import './App.css'
import useWatermark from '../lib/useWatermark'

function App () {
  const [count, setCount] = useState(0)
  const { ref } = useWatermark('Watermark', {
    angle: 20,
    opacity: 0.1,
    size: 180,
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
