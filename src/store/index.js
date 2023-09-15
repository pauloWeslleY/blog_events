import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { usersReducer } from './reducer'

const persistConfig = {
  key: 'blogevents',
  storage,
}

const persistedReducer = persistReducer(persistConfig, usersReducer)
const store = createStore(persistedReducer)
const persist = persistStore(store)

export { store, persist }
