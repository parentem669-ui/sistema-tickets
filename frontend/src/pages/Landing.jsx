import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Landing() {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  
  
  const [notificacion, setNotificacion] = useState(null)

  const mostrarNotificacion = (mensaje, tipo = 'exito') => {
    setNotificacion({ mensaje, tipo })
    
    setTimeout(() => {
      setNotificacion(null)
    }, 3500)
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    try {
      
      const usuarioGuardado = localStorage.getItem('usuario')
      const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

      await axios.post('http://127.0.0.1:8000/tickets', {
        titulo: titulo,
        descripcion: descripcion,
        usuario_id: usuario ? usuario.id : null 
      })
      
      mostrarNotificacion("✓ Ticket registrado con éxito", 'exito')
      setTitulo('')
      setDescripcion('')
    } catch (error) {
      console.error("Error al crear el ticket:", error)
      mostrarNotificacion("✕ Hubo un error al guardar el ticket", 'error')
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
        <div className="badge">● Sistema de Tickets IT</div>
        <h1>Gestión inteligente. Resoluciones rápidas. Usuarios felices.</h1>
        <p>Reduce el caos de los tickets y replantea el soporte de TI con nuestra plataforma impulsada por flujos de trabajo eficientes, diseñada para mantener tus operaciones en movimiento.</p>
      </div>

      <div className="right-section">
        <div className="form-card">
          <div className="form-toggle">
            <button className="active">Nuevo Ticket</button>
            <Link to="/dashboard" style={{ flex: 1, display: 'flex' }}>
              <button style={{ width: '100%' }}>Consultar Estado</button>
            </Link>
          </div>

          <form onSubmit={manejarEnvio}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Título del problema *" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="Descripción detallada *" 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                required 
                rows="4" 
              />
            </div>
            <div className="terms-container">
              <input type="checkbox" required id="terms" />
              <label htmlFor="terms">Acepto los <a href="#">Términos de servicio</a>.</label>
            </div>
            <button type="submit" className="btn-submit">Comenzar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Landing