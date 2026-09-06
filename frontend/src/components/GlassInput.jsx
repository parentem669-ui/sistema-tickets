import React from 'react'

function GlassInput({ label, type, name, placeholder, value, onChange, required = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      <label style={{ color: '#a5b4fc', fontWeight: '600', fontSize: '13px' }}>
        {label}
      </label>
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        required={required}
        style={{
          borderRadius: '8px', padding: '12px 14px', width: '100%', border: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.05)', outline: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#f8fafc', fontSize: '14px', boxSizing: 'border-box'
        }}
      />
    </div>
  )
}

export default GlassInput