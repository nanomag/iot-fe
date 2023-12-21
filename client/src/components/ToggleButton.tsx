import './ToggleButton.css'

type ToggleButtonProps = {
  showAllSensors: boolean
  toggleSensorView: () => void
}

export default function ToggleButton({
  showAllSensors,
  toggleSensorView,
}: ToggleButtonProps) {
  return (
    <div className="toggle-button-container">
      <button className="toggle-button" onClick={toggleSensorView}>
        {showAllSensors ? 'Show Connected Sensors Only' : 'Show All Sensors'}
      </button>
    </div>
  )
}
