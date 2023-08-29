import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { AppRoute } from './router/app.route'
import { store } from './store/index'
import { AuthProvider } from './context/authProvider'
import './styles/global.css'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)
