import "./CustomInputTextArea.css"
export const CustomInputTextArea = ({
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
    <textarea
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
