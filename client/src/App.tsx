import { useEffect, useRef, useState } from 'react'

type Message = {
  id: string
  name: string
  connected: boolean
  unit: string
  value: string
}

export default function App() {
  const connection = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')

    socket.addEventListener('open', () => {
      socket.send('Connection established')
    })

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages, message])
    })

    connection.current = socket

    return () => socket.close()
  }, [])

  return messages.map((message) => (
    <p>
      {message.name} - {message.connected.toString()}
    </p>
  ))
}
