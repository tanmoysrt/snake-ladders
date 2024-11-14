import { useEffect, useRef, useState } from 'react'
import Board from './components/board'


function App() {

  const boardRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(()=>{
    boardRef.current.update_markers({
      1: count || 0,
      2: 0,
      3: 0,
      4: 0
    })
  },[count])

  return (
    <>
      <div style={{
        padding: '50px',
      }}>
        <Board width={400} height={400} ref={boardRef} />
        <input type="number" value={count} onChange={(e)=>setCount(e.target.value)} />
      </div>
    </>
  )
}

export default App
