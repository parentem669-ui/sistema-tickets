import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notificacion, setNotificacion] = useState(null)
  
  const navigate = useNavigate()

  const mostrarNotificacion = (mensaje, tipo = 'exito') => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3500)
  }

  const manejarRegistro = async (e) => {
    e.preventDefault()
    try {
      // 1. Guardamos al usuario en la base de datos
      const response = await axios.post('http://127.0.0.1:8000/registro', {
        nombre_completo: nombre,
        email: email,
        password: password
      })
      
      // 2. Guardamos la sesión automáticamente en el navegador
      localStorage.setItem('usuario', JSON.stringify(response.data))

      // 3. Mostramos la notificación
      mostrarNotificacion("✓ Cuenta creada exitosamente. Redirigiendo...", 'exito')
      
      // 4. Redirigimos al Dashboard después de 2 segundos
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

    } catch (error) {
      const msj = error.response?.data?.detail || "Error al registrar la cuenta"
      mostrarNotificacion(`✕ ${msj}`, 'error')
    }
  }

  return (
    <div className="landing-container">
      {notificacion && (
        <div className={`toast-notification ${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}

      <div className="left-section">
        <div className="badge">● Únete a la plataforma</div>
        <h1>Crea tu cuenta de soporte en segundos.</h1>
        <p>Gestiona y da seguimiento a tus requerimientos técnicos en un solo lugar con la mejor experiencia de usuario.</p>
      </div>

      <div className="right-section">
        <div className="form-card">
          <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#1e293b' }}>Registro de Usuario</h2>

          <form onSubmit={manejarRegistro}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Nombre Completo *" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Correo Electrónico *" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Contraseña *" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn-submit">Crear Cuenta</button>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
              ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#8b5cf6', fontWeight: 'bold' }}>Inicia sesión aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register