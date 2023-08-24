import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoute } from './router/app.route'
import './styles/global.css'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppRoute />
  </React.StrictMode>
)
