import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar.jsx'
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
    <div className="page-shell relative overflow-x-hidden">
      <div className="ambient-orb ambient-orb-1" aria-hidden />
      <div className="ambient-orb ambient-orb-2" aria-hidden />

      <Navbar />

      <main className="relative z-10">
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
