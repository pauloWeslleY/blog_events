import { useEffect, useState } from 'react'
import { SpinnerLoading } from '../../../../components/SpinnerLoading'
import { Button } from '../../../../components/Button'
import { useGetEvents } from '../../../../hooks/useGetEvents'
import { useFilteredEvents } from '../../../../hooks/useFilteredEvents'
import { useEvents } from '../../../../hooks/useEvents'

export function Form({ params }) {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [type, setType] = useState('0')
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')
  const {
    handleCreateEvent,
    handleUpdateEvent,
    handleImageChange,
    dataEvent,
    loading,
  } = useGetEvents()
  const { filteredEventById } = useFilteredEvents(params.id, dataEvent)
  const events = {
    title,
    type,
    details,
    hours,
    date,
  }
  const { createEvent, updateEvent } = useEvents(events)

  useEffect(() => {
    if (params.id) {
      setTitle(filteredEventById.title)
      setDetails(filteredEventById.details)
      setType(filteredEventById.type)
      setDate(filteredEventById.date)
      setHours(filteredEventById.hours)
    } else {
      setTitle('')
      setDetails('')
      setType('0')
      setDate('')
      setHours('')
    }
  }, [params])

  async function handleCreatedEvent(event) {
    event.preventDefault()
    await handleCreateEvent(title, createEvent)
    setTitle('')
    setDetails('')
    setType('')
    setDate('')
    setHours('')
  }

  function handleUpdatedEvent(event) {
    event.preventDefault()
    handleUpdateEvent(params.id, title, updateEvent)
    setTitle('')
    setDetails('')
    setType('')
    setDate('')
    setHours('')
  }

  return (
    <form onSubmit={params.id ? handleUpdatedEvent : handleCreatedEvent}>
      <div className="form-group d-flex flex-column justify-content-center mb-3">
        <label htmlFor="titleEvents" className="form-label fw-semibold">
          Titulo
        </label>
        <input
          id="titleEvents"
          type="text"
          className="form-control fw-medium text-body-tertiary"
          placeholder="Digite o titulo do evento..."
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
      </div>

      <div className="form-group d-flex flex-column justify-content-center mb-3">
        <label htmlFor="descriptionEvents" className="form-label fw-semibold">
          Descrição
        </label>
        <textarea
          className="form-control fw-medium text-body-tertiary"
          id="descriptionEvents"
          placeholder="Digite a descrição do evento..."
          rows="3"
          onChange={event => setDetails(event.target.value)}
          value={details}
        />
      </div>

      <div className="form-group d-flex flex-column justify-content-center mb-3">
        <div className="row">
          <div className="col-4">
            <div className="form-group d-flex flex-column justify-content-center mb-3">
              <label htmlFor="typeEvents" className="form-label fw-semibold">
                Tipo do Evento
              </label>
              <select
                className="form-control form-select"
                aria-label="Select type events"
                onChange={event => setType(event.target.value)}
                value={type}
              >
                <option value="0">-- Selecione um tipo --</option>
                <option value="festa">Festa</option>
                <option value="teatro">Teatro</option>
                <option value="show">Show</option>
                <option value="evento">Evento</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="dataEvents" className="form-label fw-semibold">
              Data
            </label>
            <input
              id="dataEvents"
              type="date"
              className="form-control"
              onChange={event => setDate(event.target.value)}
              value={date}
            />
          </div>
          <div className="col-4">
            <label htmlFor="hourEvents" className="form-label fw-semibold">
              Hora
            </label>
            <input
              id="hourEvents"
              type="time"
              className="form-control"
              onChange={event => setHours(event.target.value)}
              value={hours}
            />
          </div>
        </div>
      </div>

      <div className="form-group d-flex flex-column justify-content-center mb-3">
        <label htmlFor="uploadFile" className="form-label fw-semibold">
          Upload da Imagem
        </label>
        <input
          id="uploadFile"
          type="file"
          className="form-control fw-medium text-body-tertiary"
          onChange={handleImageChange}
        />
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        {loading ? (
          <SpinnerLoading label="Loading..." className="text-danger" />
        ) : (
          <Button
            type="submit"
            className="button-light"
            title={params.id ? 'Atualizar Evento' : 'Publicar Evento'}
          />
        )}
      </div>
    </form>
  )
}
