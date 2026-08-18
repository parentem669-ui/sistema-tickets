import React from 'react'

function FormInput({ label, type, value, onChange, placeholder = "" }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', color: '#475569', fontSize: '14px' }}>
        {label}
      </label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        required 
        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} 
      />
    </div>
  )
}

export default FormInput