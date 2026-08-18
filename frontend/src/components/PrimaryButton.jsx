function PrimaryButton({ children, type = "button" }) {
  return (
    <button 
      type={type} 
      style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', width: '100%', fontSize: '15px' }}
    >
      {children}
    </button>
  )
}
export default PrimaryButton