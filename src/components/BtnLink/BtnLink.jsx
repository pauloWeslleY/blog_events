import { Link } from 'react-router-dom'

export const BtnLink = ({ path, label }) => (
  <Link
    to={path}
    className="fw-medium link-light link-offset-3 link-offset-3-hover link-underline-opacity-0 link-opacity-50-hover"
    rel="noreferrer"
  >
    {label}
  </Link>
)
