import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { Login } from '../view/login'
import { Register } from '../view/register'
import { Home } from '../view/home'
import { RecoverUsers } from '../view/recover_users'
import { RegisterEvents } from '../view/register_events'

export function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverUsers />} />
          <Route path="/register_events" element={<RegisterEvents />} />
        </Route>
      </Routes>
    </Router>
  )
}
