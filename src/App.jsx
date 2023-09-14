import { Outlet } from 'react-router-dom'
import { EventProvider } from './provider/EventsProvider'

export function App() {
  return (
    <EventProvider>
      <Outlet />
    </EventProvider>
  )
}
