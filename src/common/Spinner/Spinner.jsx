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

{
  /* <div className="css-bg6d4e">
  <svg className="rotatingText" viewBox="0 0 200 200" width="150" height="150">
    <defs><path id="circlePath" d="M100,100 m60,0 a60,60 0 1,1 -120,0 a60,60 0 1,1 120,0">
      </path></defs>
      <image href="/assets/logos/logo-6.svg" x="75" y="75" height="50" width="50"></image>
      <text><textPath xlink:href="#circlePath" style="letter-spacing:2px"> Hello my friends</textPath></text></svg>
      </div> */
}
