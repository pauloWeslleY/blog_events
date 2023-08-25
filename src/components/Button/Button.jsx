import './Button.css'

export const Button = ({ title, className, onClick }) => (
  <button
    className={`btn py-2 fw-semibold display-3 buttonHero ${className}`}
    type="button"
    onClick={onClick}
  >
    {title}
  </button>
)
