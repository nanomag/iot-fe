import { useEffect, useRef, useState } from 'react'

type Sensor = {
  id: string
  name: string
  connected: boolean
  unit: string
  value: string
}

export default function App() {
  const connection = useRef<WebSocket | null>(null)
  const [sensors, setSensors] = useState<Sensor[]>([])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')

    socket.addEventListener('open', () => {
      socket.send('Connection established')
    })

    socket.addEventListener('message', (event) => {
      const sensor = JSON.parse(event.data)
      setSensors((prevSensors) => [...prevSensors, sensor])
    })

    connection.current = socket

    return () => socket.close()
  }, [])

  return sensors.map((sensor) => (
    <p>
      {sensor.name} - {sensor.connected.toString()}
    </p>
  ))
}
