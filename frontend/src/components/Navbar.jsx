import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
        🎟️ HelpDesk
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/login" style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 'bold', padding: '8px 16px' }}>
          Iniciar Sesión
        </Link>
        <Link to="/registro" style={{ backgroundColor: '#6366f1', color: 'white', textDecoration: 'none', fontWeight: 'bold', padding: '8px 16px', borderRadius: '6px' }}>
          Registrarse
        </Link>
      </div>
    </nav>
  )
}

export default Navbar