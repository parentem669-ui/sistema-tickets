import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
  
  const navigate = useNavigate()

  const mostrarNotificacion = (texto, tipo) => {
    setMensaje({ texto, tipo })
    setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000)
  }

  const manejarLogin = async (e) => {
    e.preventDefault() 
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email: email,
        password: password
      })
      
      localStorage.setItem('usuario', JSON.stringify(response.data))
      mostrarNotificacion("✓ Sesión iniciada. Entrando...", 'exito')
      
      // LA MAGIA DE LA REDIRECCIÓN ESTÁ AQUÍ
      setTimeout(() => {
        if (response.data.rol === 'admin') {
          navigate('/admin') // Va al panel de staff
        } else {
          navigate('/dashboard') // Va al panel de cliente
        }
      }, 1500)

    } catch (error) {
      const msj = error.response?.data?.detail || "Error al iniciar sesión"
      mostrarNotificacion(`✕ ${msj}`, 'error')
    }
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {mensaje.texto && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px',
          backgroundColor: mensaje.tipo === 'exito' ? '#10b981' : '#ef4444',
          color: 'white', padding: '15px 25px', borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontWeight: 'bold', zIndex: 1000
        }}>
          {mensaje.texto}
        </div>
      )}

      <div style={{ display: 'flex', width: '100%', maxWidth: '1000px', height: '600px', backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ flex: 1, backgroundColor: '#1e293b', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
            ● Bienvenido de vuelta
          </div>
          <h1 style={{ fontSize: '48px', lineHeight: '1.1', marginBottom: '20px' }}>Tu centro de <br/><span style={{ color: '#818cf8' }}>soporte te espera.</span></h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.6' }}>Inicia sesión para revisar el estado de tus tickets, actualizar requerimientos y contactar con nuestro equipo de asistencia.</p>
        </div>

        <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '30px', textAlign: 'center' }}>Iniciar Sesión</h2>
          
          <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '16px', outline: 'none' }}
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '16px', outline: 'none' }}
            />
            
            <button 
              type="submit"
              style={{ backgroundColor: '#6366f1', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
            >
              Entrar al Sistema
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '30px', color: '#64748b' }}>
            ¿No tienes cuenta? <a href="/" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 'bold' }}>Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login