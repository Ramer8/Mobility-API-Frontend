import { useState } from "react"
import { CustomButton } from "../CustomButton/CustomButton"

const GeoLocation = () => {
  const [status, setStatus] = useState("")
  const [location, setLocation] = useState({ latitude: null, longitude: null })

  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    setStatus("")
    setLocation({ latitude, longitude })
  }

  const error = () => {
    setStatus("Unable to retrieve your location")
  }

  const geoFindMe = () => {
    setStatus("Locating…")
    navigator.geolocation.getCurrentPosition(success, error)
  }
  const loc = location.latitude
  console.log(typeof loc)
  console.log(location)
  console.log(location.longitude)
  return (
    <div>
      <p id="status">{status}</p>
      <a
        id="map-link"
        href={`https://www.openstreetmap.org/#map=18/${location.latitude}/${location.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {location.latitude && location.longitude && (
          <>
            Latitude: {location.latitude} °, Longitude: {location.longitude} °
          </>
        )}
      </a>

      <CustomButton
        className={"primaryButton"}
        title={"Find Me"}
        functionEmit={() => geoFindMe()}
      />
    </div>
  )
}

export default GeoLocation
