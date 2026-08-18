function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '14px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      © {new Date().getFullYear()} HelpDesk System. Todos los derechos reservados.
    </footer>
  )
}

export default Footer