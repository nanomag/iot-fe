import { useState, useEffect, useRef } from 'react'
import ToggleButton from './components/ToggleButton'
import SensorCard from './components/SensorCard'
import { Sensor } from './types'
import './App.css'

export default function App() {
  const connection = useRef<WebSocket | null>(null)
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [showAllSensors, setShowAllSensors] = useState(true)

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

  function toggleSensorView() {
    setShowAllSensors((prev) => !prev)
  }

  return (
    <div className="container">
      <h1>IOT Sensors</h1>

      <ToggleButton
        showAllSensors={showAllSensors}
        toggleSensorView={toggleSensorView}
      />

      <div className="sensors-container">
        {sensors
          .filter((sensor) => (showAllSensors ? true : sensor.connected))
          .map((sensor) => (
            <SensorCard
              key={sensor.id}
              sensor={sensor}
              connectSensor={connectSensor}
              disconnectSensor={disconnectSensor}
            />
          ))}
      </div>
    </div>
  )
}
