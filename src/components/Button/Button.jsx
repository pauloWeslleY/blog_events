import './Button.css'

export function Button({ title, className, type, onClick }) {
  return (
    <button
      className={`btn py-2 fw-semibold display-3 button-hero ${className}`}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
