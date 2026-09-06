import React from 'react'

function AdminTabs({ pestanaActiva, setPestanaActiva, conteoActivos, conteoCerrados }) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      marginBottom: '24px', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
      paddingBottom: '0px' 
    }}>
      <button 
        onClick={() => setPestanaActiva('activos')}
        style={{
          padding: '12px 16px',
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '15px',
          fontWeight: pestanaActiva === 'activos' ? '600' : '500',
          color: pestanaActiva === 'activos' ? '#818cf8' : '#94a3b8',
          borderBottom: pestanaActiva === 'activos' ? '3px solid #818cf8' : '3px solid transparent',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>🚀</span> Cola Activa 
        <span style={{ 
          backgroundColor: pestanaActiva === 'activos' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)', 
          color: pestanaActiva === 'activos' ? '#a5b4fc' : '#64748b',
          padding: '2px 8px', 
          borderRadius: '12px', 
          fontSize: '12px' 
        }}>
          {conteoActivos}
        </span>
      </button>
      
      <button 
        onClick={() => setPestanaActiva('historial')}
        style={{
          padding: '12px 16px',
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '15px',
          fontWeight: pestanaActiva === 'historial' ? '600' : '500',
          color: pestanaActiva === 'historial' ? '#34d399' : '#94a3b8',
          borderBottom: pestanaActiva === 'historial' ? '3px solid #34d399' : '3px solid transparent',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>📁</span> Historial Cerrados 
        <span style={{ 
          backgroundColor: pestanaActiva === 'historial' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', 
          color: pestanaActiva === 'historial' ? '#6ee7b7' : '#64748b',
          padding: '2px 8px', 
          borderRadius: '12px', 
          fontSize: '12px' 
        }}>
          {conteoCerrados}
        </span>
      </button>
    </div>
  )
}

export default AdminTabs