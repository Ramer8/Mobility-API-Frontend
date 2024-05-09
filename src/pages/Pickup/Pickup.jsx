import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import "./Pickup.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"
const libraries = ["places"]

const Pickup = () => {
  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)

  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  })
  const navigate = useNavigate()
  const rdxUser = useSelector(userData)

  useEffect(() => {
    if (rdxUser.location) {
      setLocation({
        lat: rdxUser.location.latitude,
        lng: rdxUser.location.longitude,
      })
      console.log("locating....")
      console.log(location)
    } else {
      console.log("location empty")
    }
  }, [rdxUser.location])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  const originRef = useRef()

  const destiantionRef = useRef()

  if (!isLoaded) {
    return <div>Loading...........</div>
  }
  return (
    <>
      Pickup
      <button className="primaryButton" onClick={() => navigate("/")}>
        go home
      </button>
      <CustomButton
        aria-label="center back"
        className={"cursorButton"}
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cursor-fill"
            viewBox="0 0 16 16"
          >
            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
          </svg>
        }
        functionEmit={() => {
          console.log(location)
          map.panTo(location)
          map.setZoom(15)
        }}
      />
      <GoogleMap
        center={location}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        // map-id="DEMO_MAP_ID"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={location} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  )
}

export default Pickup
