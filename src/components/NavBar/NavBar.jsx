import { FaBars, FaPaperPlane } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { MENU_LINKS, MENU_LINKS_LOGIN } from './data/[menu_props]'
import { NavItem } from './NavItem'
import './NavBar.css'

export function NavBar() {
  const dispatch = useDispatch()
  const userEmail = useSelector(state => state.userEmail)

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

            {useSelector(state => state.userLogged) ? (
              <>
                {MENU_LINKS_LOGIN.map((props, index) => (
                  <NavItem key={index} label={props.label} path={props.path} />
                ))}

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
          <span className="navbar-text">
            Navbar text with an inline element
          </span>
        </div>
      </div>
    </nav>
  )
}
