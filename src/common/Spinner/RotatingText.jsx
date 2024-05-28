import "./RotatingText.css"

const RotatingText = () => {
  return (
    <div className="spin">
      <svg
        className="rotatingText"
        viewBox="0 0 200 200"
        width="150"
        height="150"
      >
        <defs>
          <path
            id="circlePath"
            d="M100,100 m60,0 a60,60 0 1,1 -120,0 a60,60 0 1,1 120,0"
          ></path>
        </defs>
        <image
          href="/carfront.png"
          x="75"
          y="75"
          height="100"
          width="100"
        ></image>
        <text>
          <textPath xlinkHref="#circlePath" style={{ letterSpacing: "3px" }}>
            Mobility App • Mobility App • Mobility App •
          </textPath>
        </text>
      </svg>
    </div>
  )
}

export default RotatingText
