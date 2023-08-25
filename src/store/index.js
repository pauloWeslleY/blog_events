import { createStore } from 'redux'
import { usersReducer } from './reducer'

export const store = createStore(usersReducer)
