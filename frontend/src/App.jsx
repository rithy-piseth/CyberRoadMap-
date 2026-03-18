import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import CareerSelect from './pages/CareerSelect'
import Assessment from './pages/Assessment'
import Result from './pages/Result'
import Dashboard from './pages/Dashboard'
import Specialist from './pages/Specialist'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role')
  return role === 'admin' ? children : <Navigate to="/dashboard" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/career-select" element={<PrivateRoute><CareerSelect /></PrivateRoute>} />
      <Route path="/assessment" element={<PrivateRoute><Assessment /></PrivateRoute>} />
      <Route path="/result" element={<PrivateRoute><Result /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/specialist/:slug" element={<PrivateRoute><Specialist /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
    </Routes>
  )
}