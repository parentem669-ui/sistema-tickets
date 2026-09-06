import React from 'react';
import Footer from '../components/Footer';
import GhostFibers from '../components/GhostFibers';
import AuthForm from '../components/AuthForm';
import logo from '../assets/Logo_TI.png';

function Landing() {
  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. Fondo Animado */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <GhostFibers
          lineColor="#1e1b4b" glowColor="#4f46e5" speed={0.15} scale={2.2} rotation={0}
          rotationSpeed={0.1} layers={5} waveAmplitude={0.012} waveFrequency={2.5}
          waveSpeed={0.1} layerSpeed={0.05} twist={0.08} twistFrequency={4}
          twistSpeed={0.8} lineFrequency={4} lineSpacing={2.5} lineSharpness={18}
          glowFalloff={12} glowIntensity={0.8} brightness={1.1} blueBoost={1.1}
          vignette={0.9} grain={0.03} dpr={1} fps={60}
        />
      </div>

      {/* Capa de oscurecimiento para legibilidad */}
      <div style={{ 
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(11, 15, 25, 0.4) 0%, rgba(11, 15, 25, 0.85) 100%)'
      }} />

      {/* 2. Capa de Contenido Dividido (Left: Info, Right: Form) */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5%' }}>
        
        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', gap: '60px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          
          {/* LADO IZQUIERDO: Marca e Información */}
          <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
            
            {/* Logo y Nombre del sistema integrado a la izquierda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
              <img src={logo} alt="Logo TI" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.5px' }}>
                HelpDesk <span style={{ color: '#818cf8', fontWeight: '400' }}>Pro</span>
              </h1>
            </div>

            <h2 style={{ fontSize: '3.5rem', color: '#f8fafc', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '20px' }}>
              Sistema de Soporte Técnico <br/>
              <span style={{ background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Profesional</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '500px' }}>
              Gestiona tus requerimientos, comunícate en tiempo real con nuestro equipo y resuelve tus problemas de manera rápida y eficiente sin salir de esta pantalla.
            </p>
          </div>

          {/* LADO DERECHO: Formulario de inicio de sesión directo */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <AuthForm />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;