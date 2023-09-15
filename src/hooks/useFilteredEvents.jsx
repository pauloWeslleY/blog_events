export function useFilteredEvents(id, dataEvent) {
  const eventByID = dataEvent?.filter(item => item.id === id)

  let filteredEventById = {
    id: eventByID?.id,
    title: eventByID?.title,
    details: eventByID?.details,
    photoUrl: eventByID?.photoUrl,
    type: eventByID?.type,
    user: eventByID?.user,
    date: eventByID?.date,
    hours: eventByID?.hours,
    views: eventByID?.views,
  }

  eventByID?.map(item => {
    filteredEventById = {
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

    return filteredEventById
  })

  return { filteredEventById }
}
