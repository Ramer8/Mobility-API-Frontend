import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Marker,
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
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  })

  const rdxUser = useSelector(userData)

  useEffect(() => {
    if (rdxUser.location) {
      setLocation({
        lat: rdxUser.location.latitude,
        lng: rdxUser.location.longitude,
      })
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
    return <div>Loading...</div>
  }
  // async function calculateRoute() {
  //   if (originRef.current.value === "" || destiantionRef.current.value === "") {
  //     return
  //   }
  //   let results
  //   const directionsService = new google.maps.DirectionsService()
  //   if (rdxUser.location) {
  //     results = await directionsService.route({
  //       origin: location,
  //       // origin: originRef.current.value,
  //       destination: destiantionRef.current.value,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     })
  //     return results
  //   }

  //   setDirectionsResponse(results)
  //   setDistance(results.routes[0].legs[0].distance.text)
  //   setDuration(results.routes[0].legs[0].duration.text)
  // }
  const geocoder = new google.maps.Geocoder()
  async function calculateRoute() {
    if (destiantionRef.current.value === "") {
      return console.log("no destination")
    }
    console.log("calculating route")
    let results
    const directionsService = new google.maps.DirectionsService()

    // Fetch the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          results = await directionsService.route({
            origin: currentLocation,
            destination: destiantionRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
          })

          setDirectionsResponse(results)
          setDistance(results.routes[0].legs[0].distance.text)
          setDuration(results.routes[0].legs[0].duration.text)
        },
        (error) => {
          console.error("Error getting current location:", error)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance("")
    setDuration("")
    // originRef.current.value = ""
    destiantionRef.current.value = ""
  }

  const showDestination = () => {
    {
      geocoder.geocode(
        { address: destiantionRef.current?.value },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const destinationCoords = results[0].geometry.location
            map.panTo(destinationCoords)
          } else {
            console.error("Geocoding failed:", status)
          }
        }
      )
      map.setZoom(15)
    }
  }
  return (
    <>
      {/* {location && `${location.lat}` + `${location.lng}` */}
      {location && (
        <>
          <div className="inputBox">
            <div className="buttonBar">
              <Autocomplete>
                <input
                  className="inputDesign destination"
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                ></input>
              </Autocomplete>
              <CustomButton
                className={"searchButton"}
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                }
                functionEmit={() => {
                  showDestination()
                }}
              />
              {/* <Autocomplete>
                <input
                  className="inputDesign"
                  type="text"
                  placeholder="Origin"
                  ref={location}
                ></input>
              </Autocomplete> */}
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
                  map.panTo(location)
                  map.setZoom(15)
                }}
              />
            </div>

            <div className="buttonBar2">
              <CustomButton
                className={"primaryButton uploadProfile calculateRouteButton"}
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
      )}
    </>
  )
}

export default Maps
