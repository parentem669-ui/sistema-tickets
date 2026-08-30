import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

function Landing() {
  // Manejamos si el modal está abierto y qué formulario mostrar ('login' o 'register')
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'login' });

  const openModal = (type) => setModalConfig({ isOpen: true, type });
  const closeModal = () => setModalConfig({ isOpen: false, type: 'login' });

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      <Navbar openModal={openModal} />
      
      <HeroSection openModal={openModal} />
      
      <Footer />

      {/* Si isOpen es true, renderizamos el Modal flotante */}
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