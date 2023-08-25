export const INITIAL_STATE = {
  userEmail: '',
  userLogged: false,
}

export function usersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userLogged: true, userEmail: action.userEmail }
    case 'LOGOUT':
      return { ...state, userLogged: false, userEmail: null }
    default:
      return state
  }
}
