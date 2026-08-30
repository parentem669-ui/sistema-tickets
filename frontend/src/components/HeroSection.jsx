import React from 'react';

function HeroSection({ openModal }) {
  return (
    <section style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '60px 20px', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px'
    }}>
      
      {/* Badge superior estilo SaaS moderna */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '9999px',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        color: '#818cf8',
        fontSize: '14px',
        fontWeight: '500',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)'
      }}>
        <span style={{ fontSize: '10px' }}>⚡</span> Plataforma de Gestión v2.0
      </div>

      {/* Título Principal Impactante */}
      <h1 style={{ 
        fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', 
        fontWeight: '800', 
        color: '#ffffff', 
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
        margin: 0,
        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        Sistema de Soporte Técnico{' '}
        <span style={{ 
          background: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          Profesional
        </span>
      </h1>

      {/* Subtítulo legible con tarjeta translucida */}
      <p style={{ 
        fontSize: '1.15rem', 
        color: '#cbd5e1', 
        maxWidth: '680px', 
        lineHeight: '1.6',
        margin: '0 auto',
        fontWeight: '400',
        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
      }}>
        Gestiona tus requerimientos, comunícate en tiempo real con nuestro equipo y resuelve tus problemas de manera rápida y eficiente sin salir de esta pantalla.
      </p>

      {/* Botón de Acción Principal con Glow y Hover */}
      <div style={{ marginTop: '12px' }}>
        <button
          onClick={() => openModal('register')}
          style={{
            padding: '16px 36px',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 0 25px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 35px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
        >
          Comenzar Ahora 🚀
        </button>
      </div>

    </section>
  );
}

export default HeroSection;