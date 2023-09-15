import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { AppRoute } from './router/app.route'
import { persist, store } from './store/index'
import { AuthProvider } from './context/authProvider'
import './styles/global.css'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <AuthProvider>
          <AppRoute />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
