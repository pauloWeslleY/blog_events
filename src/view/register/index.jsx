import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { Button } from '../../components/Button/Button'
import { InputField } from '../../components/InputField/InputField'
import './register.css'
import { FormControl } from '../../components/FormControl/FormControl'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState()
  const [loading, setLoading] = useState()

  async function handleRegister() {
    setLoading(true)
    setMessageType(null)

    if (!email || !password) {
      setMessageType('erro')
      setMessage('Você precisa informar o email e senha para fazer o cadastro!')
      return
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        setLoading(false)
        setMessageType('success')
      })
      .catch(err => {
        setLoading(false)
        setMessageType('erro')
        switch (err.code) {
          case 'auth/weak-password':
            setMessage('Senha muito fraca, precisa ter no mínimo 6 digito')
            break
          case 'auth/email-already-in-use':
            setMessage('Email já esta sendo utilizado')
            break
          case 'auth/invalid-email':
            setMessage('Email invalido')
            break
          default:
            setMessage('Não foi possível realizar o cadastro. Tente mais tarde!')
            break
        }
      })
  }

  return (
    <FormControl background="var(--indigo-950)">
      <form className="formRegister text-center d-flex flex-column justify-content-center align-items-center mx-auto">
        <h1 className="h3 mb-3 fw-bold display-6 text-white">Cadastro</h1>

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

        {loading ? (
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <Button title="Cadastrar" onClick={handleRegister} />
        )}

        <div className="text-black text-center fw-semibold my-3">
          {messageType === 'success' && (
            <span className="alert alert-success" role="alert">
              <strong>WoW!</strong> Usuário cadastrado com sucesso!{' '}
            </span>
          )}
          {messageType === 'erro' && (
            <span className="alert alert-danger" role="alert">
              <strong>Ops!</strong> {message}!{' '}
            </span>
          )}
        </div>
      </form>
    </FormControl>
  )
}
