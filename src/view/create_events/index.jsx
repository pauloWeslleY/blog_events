import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../../config/firebase'
import { AlertHero } from '../../components/AlertHero'
import { Button } from '../../components/Button'
import { NavBar } from '../../components/NavBar'
import { SpinnerLoading } from '../../components/SpinnerLoading'

export function CreateEvents() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [type, setType] = useState('')
  const [data, setData] = useState('')
  const [hours, setHours] = useState('')
  const [image, setImage] = useState('')
  const eventsRef = collection(db, 'events')

  const createEvents = {
    title,
    type,
    details,
    hours,
    date: data,
    photoUrl: '',
    views: 0,
    public: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: useSelector(state => state.userEmail),
  }

  function handleImageChange(event) {
    if (event.target.files) {
      setImage(event.target.files[0])
    }
  }

  async function handleCreateEvents(event) {
    event.preventDefault()
    setMessage(null)
    setLoading(true)

    if (image) {
      const storageRef = ref(storage, `images/${title}/${image.name}`)
      uploadBytes(storageRef, image)
        .then(async snapshot => {
          await getDownloadURL(snapshot.ref).then(async downloadURL => {
            createEvents.photoUrl = downloadURL

            await addDoc(eventsRef, createEvents)
              .then(() => {
                setMessage('success')
                setLoading(false)
              })
              .catch(err => {
                console.log('Erro ==> ', err)
                setMessage('erro')
              })
          })
        })
        .catch(err => {
          setMessage('erro')
          console.log(err)
        })
    }
  }

  return (
    <>
      <NavBar />

      <main className="container">
        <div className="col-12">
          <div className="row">
            <h1 className="fw-semibold text-center text-secondary display-5 h2 mt-5">
              Novo Evento
            </h1>
          </div>

          <form>
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
              <label
                htmlFor="descriptionEvents"
                className="form-label fw-semibold"
              >
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
                    <label
                      htmlFor="typeEvents"
                      className="form-label fw-semibold"
                    >
                      Tipo do Evento
                    </label>
                    <select
                      className="form-control form-select"
                      aria-label="Select type events"
                      onChange={event => setType(event.target.value)}
                      defaultValue="0"
                    >
                      <option disabled value="0">
                        -- Selecione um tipo --
                      </option>
                      <option value="festa">Festa</option>
                      <option value="teatro">Teatro</option>
                      <option value="show">Show</option>
                      <option value="eventos">Eventos</option>
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <label
                    htmlFor="dataEvents"
                    className="form-label fw-semibold"
                  >
                    Data
                  </label>
                  <input
                    id="dataEvents"
                    type="date"
                    className="form-control"
                    onChange={event => setData(event.target.value)}
                    value={data}
                  />
                </div>
                <div className="col-4">
                  <label
                    htmlFor="hourEvents"
                    className="form-label fw-semibold"
                  >
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
                  title="Publicar Evento"
                  className="button-light"
                  onClick={handleCreateEvents}
                />
              )}
            </div>

            <div className="text-white text-center my-5">
              {message === 'success' && (
                <AlertHero
                  title="WoW!"
                  description="Evento publicado"
                  status="alert-success"
                />
              )}
              {message === 'erro' && (
                <AlertHero
                  title="Ops!"
                  description="Não foi possível publicar o evento"
                  status="alert-danger"
                />
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
