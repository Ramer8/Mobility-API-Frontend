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
              {calculateMoneyTrip(distance) + 1} €
            </div>
          </div>
          <div className="paymentInstrument">
            {/* <div
              className="titlePayment"
              type="submit"
              onClick={() => {
                setPayment(!Payment)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-credit-card"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>{" "}
              Payment:
            </div> */}
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
              ) : (
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
