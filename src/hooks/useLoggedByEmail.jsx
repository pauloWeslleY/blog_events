import { useSelector } from 'react-redux'

export function useLoggedByEmail() {
  const userEmail = useSelector(state => state.userEmail)
  const userLogged = useSelector(state => state.userLogged)

  return { userEmail, userLogged }
}
