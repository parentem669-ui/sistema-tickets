import { Link } from 'react-router-dom'

function AuthRedirectText({ pregunta, textoEnlace, ruta }) {
  return (
    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
      {pregunta} <Link to={ruta} style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 'bold' }}>{textoEnlace}</Link>
    </p>
  )
}
export default AuthRedirectText