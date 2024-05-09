import { GoogleMap } from "@react-google-maps/api"
import { useNavigate } from "react-router-dom"

const Pickup = () => {
  const navigate = useNavigate()

  return (
    <>
      Pickup
      <button className="primaryButton" onClick={() => navigate("/")}>
        go home
      </button>
      {/* <GoogleMap
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
      </GoogleMap> */}
    </>
  )
}

export default Pickup
