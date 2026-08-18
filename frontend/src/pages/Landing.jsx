import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

function Landing() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      
      <Navbar />

      <HeroSection />

      <Footer />

    </div>
  )
}

export default Landing