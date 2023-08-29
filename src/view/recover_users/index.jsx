import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { NavBar } from '../../components/NavBar'
import { InputField } from '../../components/InputField'
import { FormControl } from '../../components/FormControl'
import { Button } from '../../components/Button'
import { AlertHero } from '../../components/AlertHero'
import { auth } from '../../config/firebase'

export function RecoverUsers() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function recoverPassword() {
    sendPasswordResetEmail(auth, email)
      .then(result => {
        setMessage('Enviamos um link no seu email para redefinir sua senha')
      })
      .catch(err => {
        setMessage('Verifique se o email está correto')
        console.log(err)
      })
  }

  return (
    <>
      <NavBar />

      <FormControl background="var(--indigo-50)">
        <form className="container d-flex flex-column justify-content-center align-items-center">
          <h2 className="h3 fw-bold display-6 mb-3">Recuperar Senha</h2>

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <Button
            title="Enviar"
            className="buttonLight"
            onClick={recoverPassword}
          />

          <div className="mt-5">
            {message && <AlertHero title={message} status="alert-warning" />}
          </div>
        </form>
      </FormControl>
    </>
  )
}
