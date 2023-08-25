import { useSelector } from 'react-redux'
import { NavBar } from '../../components/NavBar/NavBar'
import './home.css'

export function Home() {
  return (
    <>
      <NavBar />

      <div className="homeContainer">
        <h1>Usuário: {useSelector(state => state.userEmail)}</h1>
        <h1>
          Logado:{' '}
          {useSelector(state => state.userLogged) === true ? (
            <span>user logged</span>
          ) : (
            <span>user not logged</span>
          )}
        </h1>
      </div>
    </>
  )
}
