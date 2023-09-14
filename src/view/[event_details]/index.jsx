import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import { ImClock2 } from 'react-icons/im'
import { BsFillEyeFill } from 'react-icons/bs'
import { useLoggedByEmail } from '../../hooks/useLoggedByEmail'
import { NavBar } from '../../components/NavBar'
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading'
import { db } from '../../config/firebase'
import { useGetEvents } from '../../hooks/useGetEvents'
import './EventDetails.css'

export function EventDetails() {
  const params = useParams()
  const { userEmail } = useLoggedByEmail()
  const { dataEvent, loading } = useGetEvents()
  const filteredEvent = dataEvent?.filter(item => item.id === params.id)

  let filteredEventById = {
    id: filteredEvent?.id,
    title: filteredEvent?.title,
    details: filteredEvent?.details,
    photoUrl: filteredEvent?.photoUrl,
    type: filteredEvent?.type,
    user: filteredEvent?.user,
    date: filteredEvent?.date,
    hours: filteredEvent?.hours,
    views: filteredEvent?.views,
  }

  filteredEvent?.map(item => {
    filteredEventById = {
      id: item.id,
      title: item.title,
      details: item.details,
      photoUrl: item.photoUrl,
      type: item.type,
      user: item.user,
      date: item.date,
      hours: item.hours,
      views: item.views,
    }

    return filteredEventById
  })

  useEffect(() => {
    async function handleUpdateViews() {
      const eventsRef = doc(db, 'events', filteredEventById.id)
      await updateDoc(eventsRef, {
        views: filteredEventById.views + 1,
      })
    }

    return () => {
      handleUpdateViews()
    }
  }, [])

  if (loading) {
    return (
      <>
        <NavBar />

        <div className="d-flex justify-content-center align-items-center gap-2 my-5">
          <SpinnerLoading label="Carregando..." className="text-secondary" />
          <span className="fw-semibold text-secondary">Carregando...</span>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar />

      <main>
        <img
          src={filteredEventById.photoUrl}
          alt="Banner"
          className="img-banner"
        />
        <div className="container">
          <div className="row mt-5">
            <div className="d-flex align-items-center justify-content-center mb-5">
              <h2 className="fw-semibold display-6 title-event-details">
                {filteredEventById.title}
              </h2>
            </div>

            <div className="d-flex justify-content-around gap-2">
              <div className="col-md-3 col-sm-12 p-3 box-info">
                <FaTicketAlt />
                <h5 className="mt-1">
                  <strong>Tipo</strong>
                </h5>
                <span className="mt-3 text-capitalize">
                  {filteredEventById.type}
                </span>
              </div>
              <div className="col-md-3 col-sm-12 p-3 box-info">
                <FaCalendarAlt />
                <h5 className="mt-1">
                  <strong>Data</strong>
                </h5>
                <span className="mt-3">{filteredEventById.date}</span>
              </div>
              <div className="col-md-3 col-sm-12 p-3 box-info">
                <ImClock2 />
                <h5 className="mt-1">
                  <strong>Hora</strong>
                </h5>
                <span className="mt-3">{filteredEventById.hours}</span>
              </div>
            </div>
          </div>

          <div className="row box-details">
            <h5 className="text-center mt-5">
              <strong>Detalhes do Evento</strong>
            </h5>

            <div className="d-flex justify-content-center">
              <p className="d-flex align-items-center gap-1 text-body-tertiary">
                visualizações: <BsFillEyeFill />
                <span className="fw-semibold">{filteredEventById.views}</span>
              </p>
            </div>

            <p className="text-center fw-medium p-3">
              {filteredEventById.details + 1}
            </p>
          </div>

          <div className="row text-center mb-3">
            <figure>
              <figcaption className="blockquote-footer text-muted">
                Publicado por:{' '}
                <cite title={filteredEventById.user} className="fw-bold">
                  {filteredEventById.user}
                </cite>
              </figcaption>
            </figure>
          </div>

          {userEmail === filteredEventById.user && (
            <Link to={`/edit_event/${params.id}`} className="btn button-edit">
              <FiEdit2 />
            </Link>
          )}
        </div>
      </main>
    </>
  )
}
