import { useParams } from 'react-router-dom'
import { useGetEvents } from '../../hooks/useGetEvents'
import { AlertHero } from '../../components/AlertHero'
import { Form } from './components/Form'

export function FormEventsHero() {
  const { message } = useGetEvents()
  const params = useParams()

  return (
    <main className="container">
      <div className="col-12">
        <div className="row">
          <h1 className="fw-semibold text-center text-secondary display-5 h2 mt-5">
            {params.id ? 'Atualizar Evento' : 'Novo Evento'}
          </h1>
        </div>

        <Form params={params} />

        <div className="text-white text-center my-5">
          {message === 'success' && (
            <AlertHero
              title="WoW!"
              description={params.id ? 'Evento Atualizado' : 'Evento publicado'}
              status="alert-success"
            />
          )}
          {message === 'erro' && (
            <AlertHero
              title="Ops!"
              description={
                params.id
                  ? 'Não foi possível atualizar o evento'
                  : 'Não foi possível publicar o evento'
              }
              status="alert-danger"
            />
          )}
        </div>
      </div>
    </main>
  )
}
