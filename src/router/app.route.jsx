import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from '../view/login'
import { Register } from '../view/register'
import { Home } from '../view/home'
import { App } from '../App'

export function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}
