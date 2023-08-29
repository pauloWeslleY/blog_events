import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import { ImClock2 } from 'react-icons/im'
import { NavBar } from '../../components/NavBar'
import './EventDetails.css'

export function EventDetails() {
  return (
    <>
      <NavBar />

      <main>
        <img
          src="https://placehold.co/1754x560"
          alt="Banner"
          className="img-fluid"
        />
        <div className="container">
          <div className="row mt-5">
            <div className="d-flex justify-content-around gap-2">
              <div className="col-md-3 col-sm-12 p-3 box-info">
                <FaTicketAlt />
                <h5 className="mt-1">
                  <strong>Tipo</strong>
                </h5>
                <span className="mt-3">Festa</span>
              </div>
              <div className="col-md-3 col-sm-12 p-3 box-info">
                <FaCalendarAlt />
                <h5 className="mt-1">
                  <strong>Data</strong>
                </h5>
                <span className="mt-3">10/10/2019</span>
              </div>
              <div className="col-md-3 col-sm-12 p-3 box-info">
                <ImClock2 />
                <h5 className="mt-1">
                  <strong>Hora</strong>
                </h5>
                <span className="mt-3">19:45</span>
              </div>
            </div>
          </div>

          <div className="row box-details">
            <h5 className="text-center mt-5">
              <strong>Details do Evento</strong>
            </h5>

            <p className="text-center p-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni
              quasi architecto fugit perspiciatis minus autem quaerat adipisci
              vero, odit dignissimos. Ea repellendus nesciunt hic sapiente
              dolore illo, exercitationem distinctio reiciendis.
            </p>
          </div>

          <Link to="/" className="btn button-edit">
            <FiEdit2 />
          </Link>
        </div>
      </main>
    </>
  )
}
