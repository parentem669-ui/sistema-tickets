import React, { useState } from 'react';
import { useAuth } from '../Hooks/useAuth';
import logo from '../assets/Logo_TI.png';

function AuthForm() {
  // Manejamos el estado del formulario aquí mismo, ya no en el Landing
  const [type, setType] = useState('login');
  const switchType = (newType) => setType(newType);
  const closeModal = () => {}; // Función vacía porque ya no hay modal que cerrar

  const { formData, isLogin, handleChange, handleSubmit } = useAuth(type, closeModal, switchType);

  return (
    <div style={{ 
      backgroundColor: 'rgba(15, 23, 42, 0.65)', 
      backdropFilter: 'blur(16px)', 
      padding: '40px', 
      borderRadius: '24px', 
      width: '100%', 
      maxWidth: '400px', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
    }}>
      
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <img src={logo} alt="Logo TI" style={{ width: '50px', height: '50px', marginBottom: '8px', objectFit: 'contain' }} />
        <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '22px', fontWeight: '600' }}>
          {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {!isLogin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#a5b4fc', fontSize: '13px', fontWeight: '600' }}>Nombre completo</label>
            <input type="text" name="nombre" placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={handleChange} required 
              style={{ borderRadius: '8px', padding: '12px 14px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.05)', outline: '1px solid rgba(255, 255, 255, 0.1)', color: '#f8fafc', fontSize: '14px' }} />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: '#a5b4fc', fontSize: '13px', fontWeight: '600' }}>Correo electrónico</label>
          <input type="email" name="email" placeholder="ejemplo@correo.com" value={formData.email} onChange={handleChange} required 
            style={{ borderRadius: '8px', padding: '12px 14px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.05)', outline: '1px solid rgba(255, 255, 255, 0.1)', color: '#f8fafc', fontSize: '14px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ color: '#a5b4fc', fontSize: '13px', fontWeight: '600' }}>Contraseña</label>
          <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required 
            style={{ borderRadius: '8px', padding: '12px 14px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.05)', outline: '1px solid rgba(255, 255, 255, 0.1)', color: '#f8fafc', fontSize: '14px' }} />
        </div>

        <button type="submit" style={{ padding: '14px', borderRadius: '24px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '15px', marginTop: '10px', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)' }}>
          {isLogin ? 'Ingresar' : 'Registrarme'}
        </button>
      </form>

      <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>
        {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <span onClick={() => switchType(isLogin ? 'register' : 'login')} style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 'bold' }}>
          {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
        </span>
      </p>

    </div>
  );
}

export default AuthForm;