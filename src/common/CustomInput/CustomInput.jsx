import "./CustomInput.css"
export const CustomInput = ({
  className,
  type,
  name,
  disabled,
  value,
  placeholder,
  functionChange,
  onBlurFunction,
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      onChange={functionChange}
      onBlur={onBlurFunction}
    />
  )
}
