import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api"
import { useEffect, useRef, useState } from "react"
import { CustomButton } from "../CustomButton/CustomButton"
import "./Maps.css"
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

const libraries = ["places"]
const Maps = () => {
  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const rdxUser = useSelector(userData)

  rdxUser.location ? console.log(rdxUser.location) : console.log("no location")
  console.log(
    rdxUser.location.latitude,
    "lat",
    rdxUser.location.longitude,
    "long"
  )
  // const centerRef = useRef()
  // (center = {
  //     lat: rdxUser.location.latitute,
  //     lng: rdxUser.location.longitude,
  //   })

  // useEffect(() => {
  //   console.log(rdxUser.location, "from maps")

  //   centerRef.current.value = {
  //     lat: location.latitute,
  //     lng: location.longitude,
  //   }
  // }, [rdxUser])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  const center = { lat: 39.5102503, lng: -0.4115731 }

  const originRef = useRef()
  const destiantionRef = useRef()

  if (!isLoaded) {
    return
  }
  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance("")
    setDuration("")
    originRef.current.value = ""
    destiantionRef.current.value = ""
  }

  return (
    <>
      <div className="inputBox">
        <div className="row">
          <Autocomplete>
            <input
              className="inputDesign"
              type="text"
              placeholder="Origin"
              ref={originRef}
            ></input>
          </Autocomplete>
          <CustomButton
            aria-label="center back"
            className={"cursorButton"}
            title={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-send-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
              </svg>
            }
            functionEmit={() => {
              map.panTo(center)
              // map.panTo(centerRef.current?.value)
              map.setZoom(15)
            }}
          />
        </div>

        <Autocomplete>
          <input
            className="inputDesign"
            type="text"
            placeholder="Destination"
            ref={destiantionRef}
          ></input>
        </Autocomplete>
        <div className="buttonBar">
          <CustomButton
            className={"primaryButton uploadProfile"}
            title={"Calculate Route"}
            functionEmit={() => {
              calculateRoute()
            }}
          />
          <CustomButton
            className={"primaryButton uploadProfile clearRouteButton"}
            title={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            }
            functionEmit={() => {
              clearRoute()
            }}
          />
        </div>
        <div className="infoBar">
          <div>Distance: {distance} </div>
          <div>Duration: {duration} </div>
        </div>
      </div>

      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  )
}

export default Maps
