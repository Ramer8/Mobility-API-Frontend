import "./Pickup.css"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useEffect, useState } from "react"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import picProfileRounded from "/public/picprofilerounded.jpg"
import car1 from "/public/icons/car1.svg"
import chatIcon from "/public/icons/chatIcon.svg"

const Pickup = ({
  trip,
  DriverNameSplited,
  setTogglePickupComponent,
  showDestination,
  setTogglePayment,
}) => {
  const [driverMessage, setDriverMessage] = useState("")
  const navigate = useNavigate()
  const rdxUser = useSelector(userData)

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [rdxUser])

  useEffect(() => {
    timerMessage()
    clearTimeout(timerMessage)

    timerMessage2()
    clearTimeout(timerMessage2)

    timerMessage3()
    clearTimeout(timerMessage3)

    timerMessage4()
    clearTimeout(timerMessage4)
    // eslint-disable-next-line
  }, [trip])
  const timerMessage = () => {
    setTimeout(() => {
      setDriverMessage("I arrived at the pickup point, I'm waiting here. ")
      setTogglePickupComponent(true)
    }, 5000)
  }
  const timerMessage2 = () => {
    setTimeout(() => {
      setDriverMessage("Please, Fasten your seat belt and enjoy the trip.")
      setTogglePickupComponent(true)
    }, 10000)
  }
  const timerMessage3 = () => {
    setTimeout(() => {
      showDestination(17)
      setTogglePickupComponent(true)

      setDriverMessage("We arrived to your destination.")
    }, 15000)
  }
  const timerMessage4 = () => {
    setTimeout(() => {
      setDriverMessage("")
      setTogglePickupComponent(false)
      if (driverMessage === "") {
        setTogglePayment(true)
      }
    }, 20000)
  }
  return (
    <>
      {trip && (
        <div className="pickupContainer">
          <div className="pickupHeader">
            <div className="pickupTitle">
              {driverMessage ? driverMessage : "Pickup in 3' minutes"}
            </div>
            {/* posibility put the meesage of driver  */}
            <div className="pickupMsg">
              Meet {DriverNameSplited.name}
              at the pickup point
            </div>
          </div>
          <div className="pickupBody">
            <div className="bodyLeft">
              <div className="bodyLeftTop">
                <div className="driverName">
                  {DriverNameSplited.name} {DriverNameSplited.last}
                </div>
                <div className="driverScore">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gold"
                    className="bi bi-star-fill starIcon"
                    viewBox="0 1 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>{" "}
                  {!trip.driverScore ? "0" : trip.driverScore}
                </div>
              </div>
              <div className="carBrandModel">{trip.carModel}</div>
              <div className="numberPlate">{trip.carNumberPlate}</div>
            </div>
            <div className="bodyright">
              <img
                className="profilePic"
                src={picProfileRounded}
                alt="avatarMale"
                width={45}
              ></img>
              <img
                className="carIcn"
                src={car1}
                width={90}
                alt="avatarfemale"
              ></img>
            </div>
          </div>
          <div className="bottomBar">
            <div className="callIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telephone"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
            </div>
            <div className="input">
              <img
                className="chatIcon"
                src={chatIcon}
                width={45}
                color="#8492a6"
                alt="chatIcon"
              ></img>
              <CustomInput
                className={`inputDesign ${"inputMSG"}`}
                type="text"
                name="message"
                // value={message || ""}
                placeholder={"Send a message"}
                // functionChange={inputHandler}
                // onBlurFunction={(e) => checkError(e)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Pickup
