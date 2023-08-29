import { useContext } from 'react'
import { AuthContext } from '../context/authProvider'

export function useAuth() {
  return useContext(AuthContext)
}
