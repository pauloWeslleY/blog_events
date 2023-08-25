import './Button.css'

export const Button = ({ title, className, type, onClick }) => (
  <button
    className={`btn py-2 fw-semibold display-3 buttonHero ${className}`}
    type={type}
    onClick={onClick}
  >
    {title}
  </button>
)
