import React from 'react';
import { useAuth } from '../Hooks/useAuth';

function AuthModal({ type, closeModal, switchType }) {
  const { formData, isLogin, handleChange, handleSubmit } = useAuth(type, closeModal, switchType);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50, backdropFilter: 'blur(4px)' }}>
      
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        <button onClick={closeModal} style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>
          ✖
        </button>

        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
          {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {!isLogin && (
            <input 
              type="text" 
              name="nombre" 
              placeholder="Nombre completo" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none' }} 
            />
          )}
          
          <input 
            type="email" 
            name="email" 
            placeholder="Correo electrónico" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none' }} 
          />
          
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', outline: 'none' }} 
          />

          <button type="submit" style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
            {isLogin ? 'Ingresar' : 'Registrarme'}
          </button>
        </form>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <span 
            onClick={() => switchType(isLogin ? 'register' : 'login')} 
            style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;