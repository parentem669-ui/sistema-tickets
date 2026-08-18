function AdminHeader({ cerrarSesion }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
      <div>
        <h1 style={{ fontSize: '28px', margin: 0, color: '#f8fafc' }}>Panel de Administración (Staff)</h1>
        <p style={{ color: '#94a3b8', margin: '5px 0 0 0', fontSize: '14px' }}>
          Gestión interna y resolución de requerimientos
        </p>
      </div>
      <button 
        onClick={cerrarSesion} 
        style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Cerrar Sesión
      </button>
    </div>
  )
}

export default AdminHeader