import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { EventProvider } from './provider/EventsProvider'

export function App() {
  return (
    <EventProvider>
      <NavBar />
      <Outlet />
    </EventProvider>
  )
}
