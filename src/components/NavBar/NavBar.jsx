import { FaBars, FaPaperPlane } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { MENU_LINKS } from './data/[menu_props]'
import { useLoggedByEmail } from '../../hooks/useLoggedByEmail'
import { NavItem } from './NavItem'
import './NavBar.css'

export function NavBar() {
  const { userEmail, userLogged } = useLoggedByEmail()
  const dispatch = useDispatch()
  const handleLogout = () => dispatch({ type: 'LOGOUT' })

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom border-body sticky-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <span className="navbar-brand fw-semibold d-flex align-items-center gap-2">
          <FaPaperPlane />
          Blog Events
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <NavItem label="Home" path="/" />

            {userLogged ? (
              <>
                <NavItem label="Publicar Eventos" path="/create_events" />
                <NavItem label="Meus Eventos" path={`/events/${userEmail}`} />
                <NavItem label="Sair" onClick={handleLogout} />
              </>
            ) : (
              <>
                {MENU_LINKS.map((props, index) => (
                  <NavItem key={index} label={props.label} path={props.path} />
                ))}
              </>
            )}
          </ul>
          <span className="navbar-text">{userLogged && userEmail}</span>
        </div>
      </div>
    </nav>
  )
}
