import { Link } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { BsFillEyeFill } from 'react-icons/bs'
import { useGetEvents } from '../../hooks/useGetEvents'
import { useLoggedByEmail } from '../../hooks/useLoggedByEmail'
import './EventCard.css'

export function EventCard({ id, title, photoUrl, details, views, user }) {
  const { handleDeleteEvent } = useGetEvents()
  const { userEmail } = useLoggedByEmail()

  return (
    <article className="col-md-3 col-sm-12 my-2">
      <div className="card h-100">
        <img src={photoUrl} alt="Banner Event" className="card-img-top" />
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text fw-medium text-justify">{details}</p>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between">
          <Link
            to={`/event_details/${id}`}
            className="btn fw-semibold d-flex align-items-center gap-1"
          >
            <HiOutlinePlusSm />
            detalhes
          </Link>

          {userEmail === user && (
            <button
              className="btn btn-danger fw-light"
              onClick={() => handleDeleteEvent(id)}
            >
              excluir
            </button>
          )}

          <div className="card-icon d-flex align-items-center gap-2">
            <BsFillEyeFill />
            <span className="fw-semibold">{views}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
