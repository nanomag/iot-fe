import { useState, useEffect, useRef } from 'react'

interface Sensor {
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

    socket.onopen = () => {
      console.log('Connection opened')
      connection.current = socket
    }

    socket.onmessage = (event) => {
      const updatedSensor: Sensor = JSON.parse(event.data.toString())

      setSensors((prevSensors: Sensor[]) => {
        const hasSensor = prevSensors.some(
          (sensor) => sensor.id === updatedSensor.id,
        )

        if (hasSensor) {
          return prevSensors.map((sensor) =>
            sensor.id === updatedSensor.id
              ? { ...sensor, ...updatedSensor }
              : sensor,
          )
        } else {
          return [...prevSensors, updatedSensor]
        }
      })
    }

    socket.onerror = (error) => {
      console.error(`Connection error: ${error}`)
    }

    socket.onclose = () => {
      console.log('Connection closed')
    }

    return () => socket.close()
  }, [])

  function connectSensor(id: string) {
    if (
      connection.current &&
      connection.current.readyState === WebSocket.OPEN
    ) {
      connection.current.send(JSON.stringify({ command: 'connect', id }))
    }
  }

  function disconnectSensor(id: string) {
    if (
      connection.current &&
      connection.current.readyState === WebSocket.OPEN
    ) {
      connection.current.send(JSON.stringify({ command: 'disconnect', id }))
    }
  }

  return (
    <div>
      {sensors.map((sensor) => (
        <div key={sensor.id}>
          <strong>{sensor.name}:</strong> {sensor.value} {sensor.unit}
          <button
            onClick={() => connectSensor(sensor.id)}
            disabled={sensor.connected}
          >
            Connect
          </button>
          <button
            onClick={() => disconnectSensor(sensor.id)}
            disabled={!sensor.connected}
          >
            Disconnect
          </button>
        </div>
      ))}
    </div>
  )
}
