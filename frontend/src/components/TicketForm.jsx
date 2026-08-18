function TicketForm({ titulo, setTitulo, descripcion, setDescripcion, manejarSubmit }) {
  return (
    <div style={{ flex: '1', backgroundColor: 'white', borderRadius: '12px', padding: '24px', color: '#333', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Crear un nuevo ticket</h3>
      <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Ej. Mi pantalla no enciende" value={titulo} onChange={e => setTitulo(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
        <textarea placeholder="Describe tu problema con más detalle..." value={descripcion} onChange={e => setDescripcion(e.target.value)} required rows="4" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', resize: 'vertical' }} />
        <button type="submit" style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
          Enviar Requerimiento
        </button>
      </form>
    </div>
  )
}
export default TicketForm