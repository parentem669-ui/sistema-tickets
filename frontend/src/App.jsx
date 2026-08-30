import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Ruta pública principal con los modales integrados */}
        <Route path="/" element={<Landing />} />

        {/* Ruta protegida para Clientes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute rolPermitido="cliente">
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Ruta protegida para Administradores */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute rolPermitido="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirección: Si alguien escribe una URL rara, lo manda al Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  )
}

export default App