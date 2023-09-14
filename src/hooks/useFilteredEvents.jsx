export function useFilteredEvents(id, dataEvent) {
  const updatedEvent = dataEvent?.filter(item => item.id === id)

  let updatedEventById = {
    id: updatedEvent?.id,
    title: updatedEvent?.title,
    details: updatedEvent?.details,
    photoUrl: updatedEvent?.photoUrl,
    type: updatedEvent?.type,
    user: updatedEvent?.user,
    date: updatedEvent?.date,
    hours: updatedEvent?.hours,
    views: updatedEvent?.views,
  }

  updatedEvent?.map(item => {
    updatedEventById = {
      id: item.id,
      title: item.title,
      details: item.details,
      photoUrl: item.photoUrl,
      type: item.type,
      user: item.user,
      date: item.date,
      hours: item.hours,
      views: item.views,
    }

    return updatedEventById
  })

  return { updatedEventById }
}
