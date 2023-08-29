import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../../config/firebase'
import { NavBar } from '../../components/NavBar'
import { EventCard } from '../../components/EventCard'
import { InputSearchBar } from '../../components/InputSearchBar'
import { useAuth } from '../../hooks/useAuth'

export function Home() {
  const [events, setEvents] = useState([])
  const [searchEvent, setSearchEvent] = useState('')
  const eventsCollectionRef = collection(db, 'events')
  const user = useSelector(state => state.userEmail)
  const { id } = useParams()
  const { userEvents } = useAuth()

  const filterUserEvents = userEvents.find(event => event.id === id)
  const filterEvents = events.filter(props => props.title.includes(searchEvent))

  async function getEvents() {
    const filteredEvents = query(
      eventsCollectionRef,
      where('title', '!=', true),
      orderBy('title', 'asc')
    )

    const querySnapshot = await getDocs(filteredEvents)
    const isEvents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setEvents(isEvents)
  }

  async function getEventsByUsers() {
    const filteredEvents = query(eventsCollectionRef, where('user', '==', user))

    const querySnapshot = await getDocs(filteredEvents)
    const isEvents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setEvents(isEvents)
  }

  useEffect(() => {
    getEvents()
  }, [])

  // if (!filterUserEvents) {
  //   return <h2> Event not found!</h2>
  // }

  return (
    <>
      <NavBar />

      <main className="container">
        <div className="row mt-3 mb-2">
          <h2 className="display-6 fw-medium text-muted text-center">
            Eventos
          </h2>
        </div>

        <InputSearchBar
          value={searchEvent}
          onChange={event => setSearchEvent(event.target.value)}
        />

        <div className="row my-5">
          {filterEvents?.map(props => (
            <EventCard key={props.id} {...props} />
          ))}
        </div>
      </main>
    </>
  )
}
