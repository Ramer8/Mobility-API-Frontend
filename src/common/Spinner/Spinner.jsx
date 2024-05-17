// Spinner.js

import "./Spinner.css" // Import CSS for styling

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner">
          <img src="../carfront.png" width={180} className="bg-text"></img>
        </div>
      </div>
    </div>
  )
}

export default Spinner
