import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Footer from './components/Footer.jsx'
import HomeSection from './components/sections/HomeSection.jsx'
import EducationSection from './components/sections/EducationSection.jsx'
import ProfilesSection from './components/sections/ProfilesSection.jsx'
import ProjectsShowcase from './components/ProjectsShowcase.jsx'
import SkillsSection from './components/sections/SkillsSection.jsx'
import ContactTerminal from './components/ContactTerminal.jsx'

export default function App() {
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#040810' }}>
      <div className="noise-overlay" />
      <div className="grid-lines" />

      <CustomCursor />

      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: '-20vh',
          left: '-20vw',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="fixed pointer-events-none z-0"
        style={{
          bottom: '-20vh',
          right: '-20vw',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(191,95,255,0.04) 0%, transparent 70%)',
        }}
      />

      <Navbar />

      <main>
        <HomeSection scrollY={scrollY} />
        <EducationSection />
        <ProfilesSection />
        <ProjectsShowcase />
        <SkillsSection />
        <ContactTerminal />
      </main>

      <Footer />
    </div>
  )
}
