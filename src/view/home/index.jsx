import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { InputSearchBar } from '../../components/InputSearchBar'
import { EventCard } from '../../components/EventCard'
import { useGetEvents } from '../../hooks/useGetEvents'
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading'

export function Home() {
  const [searchEvent, setSearchEvent] = useState('')
  const { events, loading } = useGetEvents()
  const params = useParams()
  const filterEvents = events.filter(props => props.title.includes(searchEvent))
  const eventsMyUser = filterEvents.filter(props => props.user === params.id)

  if (loading) {
    return <SpinnerLoading label="carregando" className="text-secondary" />
  }

  return (
    <main className="container">
      <div className="row mt-3 mb-2">
        <h2 className="display-6 fw-medium text-muted text-center">
          {params.id ? 'Meus Eventos' : 'Eventos Publicados'}
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
    </main>
  )
}
