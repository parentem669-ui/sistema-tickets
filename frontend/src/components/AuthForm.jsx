function AuthForm({ onSubmit, children }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {children}
    </form>
  )
}
export default AuthForm