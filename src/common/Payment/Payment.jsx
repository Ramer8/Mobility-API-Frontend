import { useEffect, useState } from "react"
import "./Payment.css"
import { logout, userData } from "../../app/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { calculateMoneyTrip } from "../../utils/functions"
import { fetchMyProfile, updateTrip } from "../../services/apiCalls"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const Payment = ({ distance, setTogglePayment, trip, tripId }) => {
  const [loadedData, setLoadedData] = useState(false)

  const [userPayment, setUserPayment] = useState({
    payment: "",
  })
  // eslint-disable-next-line
  const dispatch = useDispatch()
  const rdxUser = useSelector(userData)
  const navigate = useNavigate()

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      Navigate("/login")
    }
  }, [rdxUser])
  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(rdxUser.credentials.token)

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            // eslint-disable-next-line
            useDispatch(logout({ credentials: "" }))

            toast.error(fetched.message, {
              theme: "dark",
            })
            return
          }
          toast.error(fetched.message, {
            theme: "dark",
          })
          navigate("/login")
          return
        }
        setLoadedData(true)
        setUserPayment({
          payment: fetched.data.payment,
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
    // eslint-disable-next-line
  }, [rdxUser])

  const handlePaymentChange = (event) => {
    const { value } = event.target
    setUserPayment((prevUserPayment) => ({
      ...prevUserPayment,
      payment: value,
    }))
  }

  const updateCurrentTrip = async () => {
    const data = {
      trip_id: tripId,
      pay: userPayment.payment,
    }
    try {
      const fetched = await updateTrip(data, rdxUser.credentials.token)
      console.log(fetched)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {trip && userPayment && (
        <div className="paymentDesign">
          <div className="paymentBody">
            <div className="titlePayment">Pay Ride</div>
            <div className="paymentPrice">
              {calculateMoneyTrip(distance) <= 8.5
                ? calculateMoneyTrip(distance)
                : calculateMoneyTrip(distance) + 1}{" "}
              €
            </div>
          </div>
          <div className="paymentInstrument">
            <div className="iconSelectPayment">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-wallet2"
                viewBox="0 0 16 16"
              >
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
              </svg>
              <select
                name="payment"
                defaultValue={userPayment.payment || ""}
                className="selectPaymentList"
                onChange={handlePaymentChange}
              >
                <option value={"cash"}> {"Cash"}</option>
                <option value={"credit"}>{"Credit"}</option>
                <option value={"debit"}>{"Debit"}</option>
              </select>
            </div>

            <div className="paymentUser">
              {userPayment.payment == "cash" ? (
                <div className="payDirectlyIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-cash-coin iconPay"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                    />
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                  </svg>
                  <div className="payDirectlyTitle">Pay driver directly</div>
                </div>
              ) : userPayment.payment == "debit" ? (
                <div className="creditCardIcon">
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 -9 58 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <rect
                        x="0.5"
                        y="0.5"
                        width="57"
                        height="39"
                        rx="3.5"
                        fill="white"
                        stroke="#F3F3F3"
                      ></rect>{" "}
                      <path
                        d="M34.3102 28.9765H23.9591V10.5122H34.3102V28.9765Z"
                        fill="#FF5F00"
                      ></path>{" "}
                      <path
                        d="M24.6223 19.7429C24.6223 15.9973 26.3891 12.6608 29.1406 10.5107C27.1285 8.93843 24.5892 7.99998 21.8294 7.99998C15.2961 7.99998 10 13.2574 10 19.7429C10 26.2283 15.2961 31.4857 21.8294 31.4857C24.5892 31.4857 27.1285 30.5473 29.1406 28.975C26.3891 26.8249 24.6223 23.4884 24.6223 19.7429"
                        fill="#EB001B"
                      ></path>{" "}
                      <path
                        d="M48.2706 19.7429C48.2706 26.2283 42.9745 31.4857 36.4412 31.4857C33.6814 31.4857 31.1421 30.5473 29.1293 28.975C31.8815 26.8249 33.6483 23.4884 33.6483 19.7429C33.6483 15.9973 31.8815 12.6608 29.1293 10.5107C31.1421 8.93843 33.6814 7.99998 36.4412 7.99998C42.9745 7.99998 48.2706 13.2574 48.2706 19.7429"
                        fill="#F79E1B"
                      ></path>{" "}
                    </g>
                  </svg>
                  <div className="creditTitle">Mastercard ●●● 34</div>
                </div>
              ) : (
                <div className="creditCardIcon">
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 -11 70 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <rect
                        x="0.5"
                        y="0.5"
                        width="69"
                        height="47"
                        rx="5.5"
                        fill="white"
                        stroke="#fcfcfc"
                      ></rect>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.2505 32.5165H17.0099L13.8299 20.3847C13.679 19.8267 13.3585 19.3333 12.8871 19.1008C11.7106 18.5165 10.4142 18.0514 9 17.8169V17.3498H15.8313C16.7742 17.3498 17.4813 18.0514 17.5991 18.8663L19.2491 27.6173L23.4877 17.3498H27.6104L21.2505 32.5165ZM29.9675 32.5165H25.9626L29.2604 17.3498H33.2653L29.9675 32.5165ZM38.4467 21.5514C38.5646 20.7346 39.2717 20.2675 40.0967 20.2675C41.3931 20.1502 42.8052 20.3848 43.9838 20.9671L44.6909 17.7016C43.5123 17.2345 42.216 17 41.0395 17C37.1524 17 34.3239 19.1008 34.3239 22.0165C34.3239 24.2346 36.3274 25.3992 37.7417 26.1008C39.2717 26.8004 39.861 27.2675 39.7431 27.9671C39.7431 29.0165 38.5646 29.4836 37.3881 29.4836C35.9739 29.4836 34.5596 29.1338 33.2653 28.5494L32.5582 31.8169C33.9724 32.3992 35.5025 32.6338 36.9167 32.6338C41.2752 32.749 43.9838 30.6502 43.9838 27.5C43.9838 23.5329 38.4467 23.3004 38.4467 21.5514ZM58 32.5165L54.82 17.3498H51.4044C50.6972 17.3498 49.9901 17.8169 49.7544 18.5165L43.8659 32.5165H47.9887L48.8116 30.3004H53.8772L54.3486 32.5165H58ZM51.9936 21.4342L53.1701 27.1502H49.8723L51.9936 21.4342Z"
                        fill="#172B85"
                      ></path>{" "}
                    </g>
                  </svg>
                  <div className="creditTitle">Visa ●●● 89</div>
                </div>
              )}
            </div>
          </div>
          <div
            className="paymentButton"
            onClick={() => {
              setTogglePayment(false)
              updateCurrentTrip()
              navigate("/")
            }}
          >
            Pay now
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  )
}
export default Payment
