import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { InputSearchBar } from '../../components/InputSearchBar'
import { EventCard } from '../../components/EventCard'
import { useGetEvents } from '../../hooks/useGetEvents'

export function Home() {
  const [searchEvent, setSearchEvent] = useState('')
  const { events } = useGetEvents()
  const params = useParams()
  const filterEvents = events.filter(props => props.title.includes(searchEvent))
  const eventsMyUser = filterEvents.filter(props => props.user === params.id)

  return (
    <main className="container">
      <div className="row mt-3 mb-2">
        <h2 className="display-6 fw-medium text-muted text-center">
          {params.id ? 'Meus Eventos' : 'Eventos'}
        </h2>
      </div>

      <InputSearchBar
        value={searchEvent}
        onChange={event => setSearchEvent(event.target.value)}
      />

      <div className="row">
        {params.id ? (
          <section className="row my-5">
            {eventsMyUser?.map(props => (
              <EventCard key={props.id} {...props} />
            ))}
          </section>
        ) : (
          <section className="row my-5">
            {filterEvents?.map(props => (
              <EventCard key={props.id} {...props} />
            ))}
          </section>
        )}
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="toastDelete"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
    </main>
  )
}
