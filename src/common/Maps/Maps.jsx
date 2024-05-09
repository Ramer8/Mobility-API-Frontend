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
import { calculateMoneyTrip } from "../../utils/functions"
import { useNavigate } from "react-router-dom"

const libraries = ["places"]
const Maps = () => {
  const [showSection, setShowSection] = useState(false)

  const [toggleButtonTrip, setToggleButtonTrip] = useState(false)
  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
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
          toggleSection()
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
    setShowSection(false)
    setToggleButtonTrip(false)
    setTimeout(() => {
      setDirectionsResponse(null)
      setDistance("")
      setDuration("")
      // originRef.current.value = ""
      destiantionRef.current.value = ""
    }, 500)
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
  const toggleSection = () => {
    // Delay the toggle of showSection state to ensure transition effect
    setTimeout(() => {
      setShowSection((prevShowSection) => !prevShowSection)
    }, 50) // Adjust the delay time as needed
  }
  const toggleSection1 = () => {
    // Delay the toggle of showSection state to ensure transition effect
    setTimeout(() => {
      setToggleButtonTrip((prevToggleButtonTrip) => !prevToggleButtonTrip)
    }, 50) // Adjust the delay time as needed
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
                  placeholder="Enter your destination"
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

            <div className="buttonBarBottom">
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

          <div className={`footerMaps `}>
            <div
              className={`footerData ${showSection ? "show" : ""}
            ${toggleButtonTrip ? "showMore" : ""}
            `}
              onClick={toggleSection1}
            >
              <div className="data">
                <div className="leftColumn">
                  <div className="carIcon">
                    <img src="/carM.png" width={80} alt="carM" />
                  </div>
                  <div className="Data">
                    <div className="titleData">Car</div>
                    <div className="rowTitleData">
                      <div>In 10 min</div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person-plus"
                          viewBox="0 -2 16 16"
                        >
                          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                          <path
                            fillRule="evenodd"
                            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                          />
                        </svg>{" "}
                        4
                      </div>
                    </div>
                  </div>
                </div>
                <div className="infoBar">
                  <div className="rowInfoBar">
                    <div className="titleInfoBar">
                      <svg
                        width="22px"
                        height="22px"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth="3"
                        stroke="darkgray"
                        fill="currentColor"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z"></path>
                          <circle cx="17.52" cy="31.38" r="4.75"></circle>
                          <path d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z"></path>
                          <circle cx="49.23" cy="17.32" r="3.75"></circle>
                          <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89"></path>
                          <path
                            d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3"
                            strokeDasharray="7.8 2.92"
                          ></path>
                          <path d="M45.63,35.8a23,23,0,0,1,3.88-.95"></path>
                        </g>
                      </svg>
                    </div>
                    <div>{distance}</div>
                  </div>
                  <div className="rowInfoBar">
                    <div className="titleInfoBar">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>time-update</title>{" "}
                          <g id="Layer_2" data-name="Layer 2">
                            {" "}
                            <g id="invisible_box" data-name="invisible box">
                              {" "}
                              <rect
                                width="48"
                                height="48"
                                fill="none"
                              ></rect>{" "}
                            </g>{" "}
                            <g id="icons_Q2" data-name="icons Q2">
                              {" "}
                              <path d="M2,24a22,22,0,0,0,41.7,9.7,2,2,0,0,0-.5-2.6,2,2,0,0,0-3,.7A17.8,17.8,0,0,1,24,42,18,18,0,1,1,37.4,12H32.1A2.1,2.1,0,0,0,30,13.7,2,2,0,0,0,32,16H42a2,2,0,0,0,2-2V4.1A2.1,2.1,0,0,0,42.3,2,2,2,0,0,0,40,4V8.9A22,22,0,0,0,2,24Z"></path>{" "}
                              <path d="M34,32a1.7,1.7,0,0,1-1-.3L22,25.1V14a2,2,0,0,1,4,0v8.9l9,5.4a1.9,1.9,0,0,1,.7,2.7A1.9,1.9,0,0,1,34,32Z"></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>{" "}
                    </div>
                    <div>{duration}</div>
                  </div>
                </div>
                <div className="price">
                  € {calculateMoneyTrip(distance)}-
                  {calculateMoneyTrip(distance) + 7}
                </div>
              </div>
              <div>
                <div className="buttonBarSliding">
                  <CustomButton
                    className={`primaryButton orderTaxi  
                `}
                    title={"Order Taxi now"}
                    functionEmit={() => {
                      toggleSection()
                      setTimeout(() => {
                        navigate("/pickup")
                      }, 500)

                      //Navigate to new page and toggleSection()
                    }}
                  />
                  <CustomButton
                    className={`primaryButton buttonLater  
                `}
                    title={"Later"}
                    functionEmit={() => {
                      toggleSection1()
                      //Navigate to new page
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Maps
