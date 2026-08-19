import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Registro from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute rolPermitido="cliente">
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute rolPermitido="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App