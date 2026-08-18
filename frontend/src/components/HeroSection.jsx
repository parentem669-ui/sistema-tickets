import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#f8fafc', marginBottom: '20px', maxWidth: '800px' }}>
        Sistema de Soporte Técnico Profesional
      </h1>
      <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.6' }}>
        Gestiona tus requerimientos, comunícate en tiempo real con nuestro equipo y resuelve tus problemas de manera rápida y eficiente.
      </p>
      <Link to="/registro" style={{ backgroundColor: '#6366f1', color: 'white', textDecoration: 'none', fontWeight: 'bold', padding: '16px 32px', borderRadius: '8px', fontSize: '18px', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)' }}>
        Comenzar Ahora
      </Link>
    </div>
  )
}

export default HeroSection