import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { AlertHero } from '../../components/AlertHero/AlertHero'
import { InputField } from '../../components/InputField/InputField'
import { Button } from '../../components/Button/Button'
import { BtnLink } from '../../components/BtnLink/BtnLink'
import { FormControl } from '../../components/FormControl/FormControl'
import './login.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function SignIn() {
    await signInWithEmailAndPassword(auth, email, password)
      .then(results => {
        setMessage('success')
      })
      .catch(err => {
        // Erro aqui!
        setMessage('erro')
      })
  }

  return (
    <FormControl background="var(--indigo-800)">
      <form className="form-signIn d-flex flex-column justify-content-center align-items-center mx-auto text-center">
        <h1 className="h3 mb-3 fw-bold display-6 text-white">Login</h1>

        <InputField
          label="Email"
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />

        <InputField
          label="Senha"
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />

        <Button title="Sign in" onClick={SignIn} />

        <div className="messageLogin text-white text-center my-5">
          {message === 'success' && (
            <AlertHero title="WoW!" description=" Você esta conectado!" status="alert-success" />
          )}
          {message === 'erro' && (
            <AlertHero
              title="Ops!"
              description="Verifique se a senha ou usuário estão corretos!"
              status="alert-danger"
            />
          )}
        </div>

        <div className="optionLogin d-flex gap-2 align-items-center mt-5 mb-3">
          <BtnLink label="Recuperar senha" path="/#" />
          <span className="text-secondary">{' | '}</span>
          <BtnLink label="Quero me cadastrar" path="/register" />
        </div>
      </form>
    </FormControl>
  )
}
