import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import GhostFibers from '../components/GhostFibers';

function Landing() {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'login' });

  const openModal = (type) => setModalConfig({ isOpen: true, type });
  const closeModal = () => setModalConfig({ isOpen: false, type: 'login' });

  return (
    <div style={{ backgroundColor: '#0b0f19', minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. Fondo GhostFibers con parámetros suavizados para dar contraste */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <GhostFibers
          lineColor="#1e1b4b"
          glowColor="#4f46e5"
          speed={0.15}
          scale={2.2}
          rotation={0}
          rotationSpeed={0.1}
          layers={5}
          waveAmplitude={0.012}
          waveFrequency={2.5}
          waveSpeed={0.1}
          layerSpeed={0.05}
          twist={0.08}
          twistFrequency={4}
          twistSpeed={0.8}
          lineFrequency={4}
          lineSpacing={2.5}
          lineSharpness={18}
          glowFalloff={12}
          glowIntensity={0.8}
          brightness={1.1}
          blueBoost={1.1}
          vignette={0.9}
          grain={0.03}
          dpr={1}
          fps={60}
        />
      </div>

      {/* Capa de degrade negro extra para garantizar legibilidad */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 2, 
        background: 'radial-gradient(circle at center, rgba(11, 15, 25, 0.4) 0%, rgba(11, 15, 25, 0.85) 100%)',
        pointerEvents: 'none' 
      }} />

      {/* 2. Capa de Contenido por encima */}
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar openModal={openModal} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HeroSection openModal={openModal} />
        </div>
        <Footer />
      </div>

      {/* 3. Modal flotante */}
      {modalConfig.isOpen && (
        <AuthModal 
          type={modalConfig.type} 
          closeModal={closeModal} 
          switchType={(newType) => setModalConfig({ ...modalConfig, type: newType })} 
        />
      )}
    </div>
  );
}

export default Landing;