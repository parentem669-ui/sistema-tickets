import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import GlassInput from './GlassInput'
import GlassButton from './GlassButton'

function AuthModal({ type, closeModal, switchType }) {
  const { formData, isLogin, handleChange, handleSubmit } = useAuth(type, closeModal, switchType)

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(2, 6, 23, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(8px)' }}>
      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(16px)', padding: '35px', borderRadius: '20px', width: '90%', maxWidth: '360px', position: 'relative', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        
        <button onClick={closeModal} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✖</button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '28px' }}>⚡</div>
          <h2 style={{ margin: '5px 0 0 0', color: '#f8fafc', fontSize: '20px' }}>{isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!isLogin && <GlassInput label="Nombre completo" type="text" name="nombre" placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={handleChange} />}
          <GlassInput label="Correo electrónico" type="email" name="email" placeholder="ejemplo@correo.com" value={formData.email} onChange={handleChange} />
          <GlassInput label="Contraseña" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
          <GlassButton type="submit">{isLogin ? 'Ingresar' : 'Registrarme'}</GlassButton>
        </form>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '15px', fontSize: '13px' }}>
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <span onClick={() => switchType(isLogin ? 'register' : 'login')} style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </span>
        </p>

      </div>
    </div>
  )
}

export default AuthModal