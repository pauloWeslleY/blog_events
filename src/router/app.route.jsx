import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { Login } from '../view/login'
import { Register } from '../view/register'
import { Home } from '../view/home'
import { RecoverUsers } from '../view/recover_users'
import { FormEventsHero } from '../view/form_events'
import { EventDetails } from '../view/[event_details]'

export function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverUsers />} />
          <Route path="/create_events" element={<FormEventsHero />} />
          <Route path="/edit_event/:id" element={<FormEventsHero />} />
          <Route path="/event_details/:id" element={<EventDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}
