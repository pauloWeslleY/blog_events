import { Link } from 'react-router-dom'

export const NavItem = ({ label, path, onClick }) => (
  <li className="nav-item">
    <Link to={path} className="nav-link fw-medium" onClick={onClick}>
      {label}
    </Link>
  </li>
)
