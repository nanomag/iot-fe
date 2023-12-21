import { Sensor } from '../types'
import './SensorCard.css'

type SensorCardProps = {
  sensor: Sensor
  connectSensor: (id: string) => void
  disconnectSensor: (id: string) => void
}

export default function SensorCard({
  sensor,
  connectSensor,
  disconnectSensor,
}: SensorCardProps) {
  const sensorValue = sensor.value ? `${sensor.value} ${sensor.unit}` : '-'

  return (
    <div className="sensor-card">
      <p>
        <strong>{sensor.name}</strong>
        {sensorValue}
      </p>

      <p>
        <small className={sensor.connected ? 'connected' : 'disconnected'}>
          {sensor.connected ? '[Connected]' : '[Disconnected]'}
        </small>
      </p>

      <div>
        <button
          className="action-button connect-button"
          onClick={() => connectSensor(sensor.id)}
          disabled={sensor.connected}
        >
          Connect
        </button>
        <button
          className="action-button disconnect-button"
          onClick={() => disconnectSensor(sensor.id)}
          disabled={!sensor.connected}
        >
          Disconnect
        </button>
      </div>
    </div>
  )
}
