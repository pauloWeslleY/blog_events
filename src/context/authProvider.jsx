import { createContext, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const userLogged = useSelector(state => state.userEmail)
  const [user, setUser] = useState(null) // Usuário logado (ou null se não estiver logado)
  const [userEvents, setUserEvents] = useState([]) // Eventos do usuário logado

  const userLoggedProps = {
    user,
    setUser,
    userEvents,
    setUserEvents,
  }

  const authContextValue = useMemo(() => userLoggedProps, [user, userEvents])

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
