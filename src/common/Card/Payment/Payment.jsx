import "./Payment.css"
const Payment = () => {
  return (
    <div className="paymentDesign">
      <div className="paymentBody">
        <div className="titlePayment">Pay Ride</div>
        <div className="paymentPrice">{"€25"}</div>
      </div>
      <div className="paymentInstrument">
        <div className="titlePayment">Payment</div>
        <div className="paymentUser">MasterCard ● ● ● 0 34</div>
      </div>
    </div>
  )
}

export default Payment
