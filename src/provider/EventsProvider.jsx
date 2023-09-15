import { useState, useEffect, useMemo } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { EventContext } from '../context/eventContext'
import { db, storage } from '../config/firebase'

export function EventProvider({ children }) {
  const [events, setEvents] = useState([])
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const eventsCollectionRef = collection(db, 'events')
  const navigate = useNavigate()

  useEffect(() => {
    async function getEventsAll() {
      const filteredEvents = query(
        eventsCollectionRef,
        where('title', '!=', true),
        orderBy('title', 'asc')
      )

      const querySnapshot = await getDocs(filteredEvents)
      const isEvents = querySnapshot.docs.map(props => ({
        id: props.id,
        ...props.data(),
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

  async function handleCreateEvent(title, createEvent) {
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
                navigate('/')
              })
              .catch(err => {
                setMessage('erro')
                setLoading(true)
                console.log('Erro ==> ', err)
              })
          })
        })
        .catch(err => {
          setMessage('erro')
          setLoading(true)
          console.log(err)
        })
    }
  }

  const handleUpdateEvent = async (id, title, eventUpdated) => {
    setMessage(null)
    setLoading(true)

    if (!image) {
      setMessage('erro')
      return
    }

    const eventID = events.some(prod => prod.id === id)
    const upEvent = eventUpdated

    if (eventID) {
      const docRef = doc(db, 'events', id)
      const storageRef = ref(storage, `images/${title}/${image.name}`)
      await uploadBytes(storageRef, image)
      const downloadURL = await getDownloadURL(storageRef)
      upEvent.photoUrl = downloadURL

      await updateDoc(docRef, upEvent)
        .then(() => {
          const eventItem = events.map(event =>
            event.id === id ? { id, ...upEvent } : event
          )
          setEvents(eventItem)
          setMessage('success')
          setLoading(false)
        })
        .catch(err => {
          setMessage('erro')
          setLoading(true)
          console.log('erro', err)
        })
    }
  }

  async function handleDeleteEvent(id) {
    await deleteDoc(doc(db, 'events', id))
    setEvents(events.filter(item => item.id !== id))
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
        events,
        dataEvent,
        loading,
        message,
        handleImageChange,
        handleCreateEvent,
        handleUpdateEvent,
        handleDeleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
