import { useState } from 'react'
import { AlertHero } from '../../components/AlertHero/AlertHero'
import { Button } from '../../components/Button/Button'
import { NavBar } from '../../components/NavBar/NavBar'

export function RegisterEvents() {
  const [message, setMessage] = useState()

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
              />
            </div>

            <div className="form-group d-flex flex-column justify-content-center mb-3">
              <div className="row">
                <div className="col-4">
                  <div className="form-group d-flex flex-column justify-content-center mb-3">
                    <label htmlFor="typeEvents" className="form-label fw-semibold">
                      Tipo do Evento
                    </label>
                    <select className="form-control form-select" aria-label="Small select example">
                      <option disabled selected>
                        -- Selecione um tipo --
                      </option>
                      <option value="1">Festa</option>
                      <option value="2">Teatro</option>
                      <option value="3">Show</option>
                      <option value="3">Eventos</option>
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <label htmlFor="dataEvents" className="form-label fw-semibold">
                    Data
                  </label>
                  <input id="dataEvents" type="date" className="form-control" />
                </div>
                <div className="col-4">
                  <label htmlFor="hourEvents" className="form-label fw-semibold">
                    Hora
                  </label>
                  <input id="hourEvents" type="time" className="form-control" />
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
              />
            </div>

            <div className="d-flex justify-content-center align-items-center mt-5">
              <Button type="submit" title="Publicar Evento" className="buttonLight" />
            </div>

            <div className="text-white text-center my-5">
              {message === 'success' && (
                <AlertHero title="WoW!" description="Evento publicado" status="alert-success" />
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
