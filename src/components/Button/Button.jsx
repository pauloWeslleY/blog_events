import './Button.css'

export const Button = ({ title, onClick }) => (
  <button className="btn fw-medium py-2 w-50 buttonLogin" type="button" onClick={onClick}>
    {title}
  </button>
)
