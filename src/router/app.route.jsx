import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { query, where, getDocs, collection } from 'firebase/firestore'
import { App } from '../App'
import { Login } from '../view/login'
import { Register } from '../view/register'
import { Home } from '../view/home'
import { RecoverUsers } from '../view/recover_users'
import { CreateEvents } from '../view/create_events'
import { EventDetails } from '../view/event_details'
import { db } from '../config/firebase'

export function AppRoute() {
  const [events, setEvents] = useState([])
  const eventsCollectionRef = collection(db, 'events')

  async function getEventsAll() {
    const filteredEvents = query(
      eventsCollectionRef,
      where('title', '!=', true)
    )

    const querySnapshot = await getDocs(filteredEvents)
    const isEvents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setEvents(isEvents)
  }

  const data = useMemo(() => {
    const dataEvent = events.map(props => ({
      id: props.id,
      title: props.title,
      details: props.details,
      photoUrl: props.photoUrl,
      type: props.type,
      user: props.user,
      date: props.date,
      hours: props.hours,
    }))

    return dataEvent
  }, [events])

  useEffect(() => {
    getEventsAll()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverUsers />} />
          <Route path="/create_events" element={<CreateEvents />} />
          <Route
            path="/event_details/:id"
            element={<EventDetails event={data} />}
          />
        </Route>
      </Routes>
    </Router>
  )
}
