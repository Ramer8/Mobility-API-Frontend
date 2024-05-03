import "./CustomButton.css"

export const CustomButton = ({ className, title, functionEmit }) => {
  return (
    <div className={className} onClick={functionEmit}>
      {title}
    </div>
  )
}
