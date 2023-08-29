import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { NavBar } from '../../components/NavBar'
import { EventCard } from '../../components/EventCard'
import { InputSearchBar } from '../../components/InputSearchBar'

export function Home() {
  const [events, setEvents] = useState([])
  const [searchEvent, setSearchEvent] = useState('')
  const eventsCollectionRef = collection(db, 'events')
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

  useEffect(() => {
    getEvents()
  }, [])

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
