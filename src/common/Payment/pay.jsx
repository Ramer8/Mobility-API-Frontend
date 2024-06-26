import { useEffect, useState } from "react"
import "./Payment.css"
import { logout, userData } from "../../app/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { calculateMoneyTrip } from "../../utils/functions"
import { fetchMyProfile, updateProfile } from "../../services/apiCalls"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const Payment = ({
  distance,
  setTogglePayment,
  setToggleCalculateButton,
  setTrip,
  trip,
  clearRoute,
}) => {
  const [Payment, setPayment] = useState(false)
  const [write, setWrite] = useState(false)
  const [loadedData, setLoadedData] = useState(false)

  const [userPayment, setUserPayment] = useState({
    payment: "",
  })

  const dispatch = useDispatch()
  const rdxUser = useSelector(userData)
  const navigate = useNavigate()
  const SUCCESS_MSG_TIME = 2000

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
        console.log(userPayment, "el q paga")
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
  }, [rdxUser])

  const updateData = async () => {
    try {
      const fetched = await updateProfile(
        userPayment,
        rdxUser.credentials.token
      )

      toast.success(fetched.message, { theme: "dark" })
      console.log(fetched)
      setUserPayment({
        payment: fetched.paymentUpdated,
      })
      setWrite("disabled")
    } catch (error) {
      console.log(error)
    }
  }

  // const paymentFlow = () => {
  // }
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
            <div
              className="titlePayment"
              type="submit"
              onClick={() => {
                // paymentFlow()
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
            </div>
            {/* {Payment ? "true" : "false"} */}
            <select
              name="payment"
              defaultValue={userPayment.payment || ""}
              // defaultValue={" " || "cash"}
              className="selectPaymentList"
            >
              <option value={"cash"}> {"Pay driver directly"}</option>
              <option value={"credit"}>{"Credit"}</option>
              <option value={"debit"}>{"Debit"}</option>
            </select>
            <div className="paymentUser">
              {userPayment.payment}
              {userPayment.payment == "cash" ? (
                "Pay driver directly"
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
                  <div className="creditTitle">MasterCard ● ● ● 034</div>
                </div>
              )}
            </div>
          </div>
          <div
            className="paymentButton"
            onClick={() => {
              setTogglePayment(false)
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

/////current payment component
// import { useEffect } from "react"
// import "./Payment.css"
// import { userData } from "../../app/slices/userSlice"
// import { useSelector } from "react-redux"
// import { Navigate, useNavigate } from "react-router-dom"
// import { calculateMoneyTrip } from "../../utils/functions"
// const Payment = ({
//   distance,
//   setTogglePayment,
//   setToggleCalculateButton,
//   setTrip,
//   trip,
//   clearRoute,
// }) => {
//   const rdxUser = useSelector(userData)
//   const navigate = useNavigate()
//   const SUCCESS_MSG_TIME = 2000

//   useEffect(() => {
//     if (!rdxUser.credentials.token) {
//       Navigate("/login")
//     }
//   }, [rdxUser])

//   return (
//     <>
//       {trip && (
//         <div className="paymentDesign">
//           <div className="paymentBody">
//             <div className="titlePayment">Pay Ride</div>
//             <div className="paymentPrice">
//               € {calculateMoneyTrip(distance) + 1}
//             </div>
//           </div>
//           <div className="paymentInstrument">
//             <div className="titlePayment">Payment:</div>
//             <div className="paymentUser">
//               {!rdxUser.credentials.tokenData?.payment == "cash" ? (
//                 "Pay driver directly"
//               ) : (
//                 <div className="creditCardIcon">
//                   <svg
//                     width="50px"
//                     height="50px"
//                     viewBox="0 -9 58 58"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                     <g
//                       id="SVGRepo_tracerCarrier"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     ></g>
//                     <g id="SVGRepo_iconCarrier">
//                       {" "}
//                       <rect
//                         x="0.5"
//                         y="0.5"
//                         width="57"
//                         height="39"
//                         rx="3.5"
//                         fill="white"
//                         stroke="#F3F3F3"
//                       ></rect>{" "}
//                       <path
//                         d="M34.3102 28.9765H23.9591V10.5122H34.3102V28.9765Z"
//                         fill="#FF5F00"
//                       ></path>{" "}
//                       <path
//                         d="M24.6223 19.7429C24.6223 15.9973 26.3891 12.6608 29.1406 10.5107C27.1285 8.93843 24.5892 7.99998 21.8294 7.99998C15.2961 7.99998 10 13.2574 10 19.7429C10 26.2283 15.2961 31.4857 21.8294 31.4857C24.5892 31.4857 27.1285 30.5473 29.1406 28.975C26.3891 26.8249 24.6223 23.4884 24.6223 19.7429"
//                         fill="#EB001B"
//                       ></path>{" "}
//                       <path
//                         d="M48.2706 19.7429C48.2706 26.2283 42.9745 31.4857 36.4412 31.4857C33.6814 31.4857 31.1421 30.5473 29.1293 28.975C31.8815 26.8249 33.6483 23.4884 33.6483 19.7429C33.6483 15.9973 31.8815 12.6608 29.1293 10.5107C31.1421 8.93843 33.6814 7.99998 36.4412 7.99998C42.9745 7.99998 48.2706 13.2574 48.2706 19.7429"
//                         fill="#F79E1B"
//                       ></path>{" "}
//                     </g>
//                   </svg>
//                   <div className="creditTitle">MasterCard ● ● ● 034</div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div
//             className="paymentButton"
//             onClick={() => {
//               setTogglePayment(false)
//               navigate("/")
//             }}
//           >
//             Pay now
//           </div>
//         </div>
//       )}
//     </>
//   )
// }
// export default Payment

////
