import { Link } from 'react-router-dom'

export function NavItem({ label, path, onClick }) {
  return (
    <li className="nav-item">
      <Link to={path} className="nav-link fw-medium" onClick={onClick}>
        {label}
      </Link>
    </li>
  )
}
