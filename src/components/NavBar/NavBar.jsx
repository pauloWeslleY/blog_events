import './NavBar.css'

export const NavBar = () => {
  const LINKS = ['Blog', 'About', 'Events']

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container">
        <span className="navbar-brand fw-semibold">Blog Events</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">
                Home
              </a>
            </li>
            {LINKS.map((props, index) => (
              <li key={index} className="nav-item">
                <a className="nav-link fw-medium" href="/#">
                  {props}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
