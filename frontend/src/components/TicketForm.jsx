import React from 'react'

function TicketForm({ titulo, setTitulo, descripcion, setDescripcion, manejarSubmit }) {
  return (
    <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>Asunto del requerimiento</label>
        <input 
          type="text" 
          placeholder="Ej. Mi pantalla no enciende..." 
          value={titulo} 
          onChange={e => setTitulo(e.target.value)} 
          required 
          style={{ 
            padding: '14px', 
            borderRadius: '12px', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            backgroundColor: 'rgba(15, 23, 42, 0.6)', 
            color: '#f8fafc', 
            outline: 'none', 
            fontSize: '15px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>Descripción detallada</label>
        <textarea 
          placeholder="Describe tu problema con la mayor cantidad de detalles posible..." 
          value={descripcion} 
          onChange={e => setDescripcion(e.target.value)} 
          required 
          rows="5" 
          style={{ 
            padding: '14px', 
            borderRadius: '12px', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            backgroundColor: 'rgba(15, 23, 42, 0.6)', 
            color: '#f8fafc', 
            outline: 'none', 
            fontSize: '15px', 
            resize: 'vertical', 
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }} 
        />
      </div>

      <button 
        type="submit" 
        style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
          color: 'white', 
          padding: '14px', 
          borderRadius: '12px', 
          border: 'none', 
          fontWeight: '600', 
          cursor: 'pointer', 
          marginTop: '10px', 
          fontSize: '16px',
          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)'
        }}
      >
        Enviar Requerimiento
      </button>
    </form>
  )
}

export default TicketForm