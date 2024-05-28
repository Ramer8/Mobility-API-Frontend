import "./Spinner.css" // Import CSS for styling
import spinCar from "/carfront.png"
const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner">
          <img src={spinCar} width={180} className="bg-text" alt="spinCar" />
        </div>
      </div>
    </div>
  )
}

export default Spinner
