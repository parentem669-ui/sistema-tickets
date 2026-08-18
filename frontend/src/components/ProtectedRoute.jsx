import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, rolPermitido }) {
  const usuarioStr = localStorage.getItem('usuario')

  if (!usuarioStr) {
    return <Navigate to="/login" replace />
  }

  const usuario = JSON.parse(usuarioStr)

  if (rolPermitido && usuario.rol !== rolPermitido) {
    return <Navigate to={usuario.rol === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  return children
}

export default ProtectedRoute