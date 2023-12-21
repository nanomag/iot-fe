import { useEffect, useRef } from 'react'

export default function App() {
  const connection = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')

    socket.addEventListener('open', () => {
      socket.send('Connection established')
    })

    socket.addEventListener('message', (event) => {
      console.log('Server message', JSON.parse(event.data))
    })

    connection.current = socket

    return () => socket.close()
  }, [])

  return null
}
