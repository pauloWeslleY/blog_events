import { useSelector } from 'react-redux'

export function useEvents(props) {
  const {
    title,
    type,
    details,
    hours,
    date,
    photoUrl = '',
    views = 0,
    publics = 1,
    createdAt = new Date(),
    updatedAt = new Date(),
    user = useSelector(state => state.userEmail),
  } = props

  const createEvent = {
    title,
    type,
    details,
    hours,
    date,
    photoUrl,
    views,
    publics,
    createdAt,
    user,
  }

  const updateEvent = {
    title,
    type,
    details,
    hours,
    date,
    photoUrl,
    views,
    publics,
    updatedAt,
    user,
  }

  return {
    createEvent,
    updateEvent,
  }
}
