import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, rolPermitido }) {
  const usuarioStr = localStorage.getItem('usuario')

  // Si no hay usuario guardado, lo mandamos de vuelta a la Landing principal
  if (!usuarioStr) {
    return <Navigate to="/" replace />
  }

  const usuario = JSON.parse(usuarioStr)

  // Validación de roles (normalizado a minúsculas)
  const rolUsuario = usuario.rol?.toLowerCase()
  const rolRequerido = rolPermitido?.toLowerCase()

  if (rolRequerido && rolUsuario !== rolRequerido) {
    return <Navigate to={rolUsuario === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  return children
}

export default ProtectedRoute