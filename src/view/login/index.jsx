import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { FaPaperPlane } from 'react-icons/fa'
import { auth } from '../../config/firebase'
import { AlertHero } from '../../components/AlertHero'
import { InputField } from '../../components/InputField'
import { Button } from '../../components/Button'
import { BtnLink } from '../../components/BtnLink'
import { FormControl } from '../../components/FormControl'
import { useLoggedByEmail } from '../../hooks/useLoggedByEmail'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { userLogged } = useLoggedByEmail()
  const dispatch = useDispatch()

  async function SignIn() {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMessage('success')
        setTimeout(() => {
          dispatch({ type: 'LOGIN', userEmail: email })
        }, 2000)
      })
      .catch(err => {
        setMessage('erro')
        console.log(err)
      })
  }

  return (
    <FormControl background="var(--indigo-700)">
      {userLogged ? <Navigate to="/" /> : null}

      <form className="d-flex flex-column justify-content-center align-items-center mx-auto text-center">
        <div className="d-flex flex-column align-items-center text-white">
          <FaPaperPlane className="w-25 h-25" />
          <h1 className="h3 mb-4 fw-bold display-6">Login</h1>
        </div>

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

        <Button
          type="button"
          title="Entrar"
          onClick={SignIn}
          className="button-dark"
        />

        <div className="text-white text-center my-5">
          {message === 'success' && (
            <AlertHero
              title="WoW!"
              description="Você esta conectado!"
              status="alert-success"
            />
          )}
          {message === 'erro' && (
            <AlertHero
              title="Ops!"
              description="Verifique se a senha ou usuário estão corretos!"
              status="alert-danger"
            />
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          <BtnLink label="Recuperar senha" path="/recover" />
          <span className="text-light">{' | '}</span>
          <BtnLink label="Quero me cadastrar" path="/register" />
        </div>
      </form>
    </FormControl>
  )
}
