import React from 'react';

function HeroSection({ openModal }) {
  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Efecto de brillo de fondo */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div style={{ zIndex: 1, maxWidth: '800px' }}>
        <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '20px', lineHeight: '1.2' }}>
          Sistema de Soporte Técnico <span style={{ color: '#6366f1' }}>Profesional</span>
        </h1>
        
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px', lineHeight: '1.6' }}>
          Gestiona tus requerimientos, comunícate en tiempo real con nuestro equipo y resuelve tus problemas de manera rápida y eficiente sin salir de esta pantalla.
        </p>

        <button 
          onClick={() => openModal('register')}
          style={{ backgroundColor: '#6366f1', color: 'white', border: 'none', padding: '15px 35px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 14px 0 rgba(99,102,241,0.39)', transition: 'transform 0.2s' }}
        >
          Comenzar Ahora 🚀
        </button>
      </div>
    </main>
  );
}

export default HeroSection;