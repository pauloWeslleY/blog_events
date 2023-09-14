import { useContext } from 'react'
import { EventContext } from '../context/eventContext'

export function useGetEvents() {
  const context = useContext(EventContext)

  return context
}
