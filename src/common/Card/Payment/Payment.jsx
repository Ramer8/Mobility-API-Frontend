import { useEffect } from "react"
import "./Payment.css"
import { userData } from "../../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const Payment = ({ trip }) => {
  const rdxUser = useSelector(userData)
  useEffect(() => {
    if (!rdxUser.credentials.token) {
      Navigate("/login")
    }
  }, [rdxUser])
  console.log(rdxUser.credentials.tokenData.payment)
  return (
    <div className="paymentDesign">
      <div className="paymentBody">
        <div className="titlePayment">Pay Ride</div>
        <div className="paymentPrice">{"€25"}</div>
      </div>
      <div className="paymentInstrument">
        <div className="titlePayment">Payment</div>
        <div className="paymentUser">
          {rdxUser.credentials.tokenData.payment}
        </div>
        {/* MasterCard ● ● ● 0 34 */}
      </div>
    </div>
  )
}
export default Payment
