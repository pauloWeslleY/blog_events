import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { EventContext } from '../context/eventContext'
import { db } from '../config/firebase'

export function EventProvider({ children }) {
  const [events, setEvents] = useState([])
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const eventsCollectionRef = collection(db, 'events')

  useEffect(() => {
    async function getEventsAll() {
      const filteredEvents = query(
        eventsCollectionRef,
        where('title', '!=', true)
      )

      const querySnapshot = await getDocs(filteredEvents)
      const isEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      setEvents(isEvents)
      setLoading(false)
    }

    getEventsAll()
  }, [])

  function handleImageChange(event) {
    if (event.target.files) {
      setImage(event.target.files[0])
    }
  }

  async function handleCreateEvent(createEvent) {
    setMessage(null)
    setLoading(true)
    const event = createEvent

    if (image) {
      const storageRef = ref(storage, `images/${title}/${image.name}`)
      uploadBytes(storageRef, image)
        .then(async snapshot => {
          await getDownloadURL(snapshot.ref).then(async downloadURL => {
            event.photoUrl = downloadURL

            await addDoc(eventsCollectionRef, event)
              .then(() => {
                setMessage('success')
                setLoading(false)
              })
              .catch(err => {
                console.log('Erro ==> ', err)
                setMessage('erro')
              })
          })
        })
        .catch(err => {
          setMessage('erro')
          console.log(err)
        })
    }
  }

  const dataEvent = useMemo(() => {
    const event = events.map(props => ({
      id: props.id,
      title: props.title,
      details: props.details,
      photoUrl: props.photoUrl,
      type: props.type,
      user: props.user,
      date: props.date,
      hours: props.hours,
      views: props.views,
    }))

    return event
  }, [events])

  return (
    <EventContext.Provider
      value={{
        dataEvent,
        loading,
        message,
        handleImageChange,
        handleCreateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
