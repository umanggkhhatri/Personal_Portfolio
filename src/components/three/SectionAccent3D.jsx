import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { useTheme } from '../../context/ThemeContext.jsx'

function AccentSphere({ position, scale, color }) {
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  )
}

function AccentScene() {
  const { isDark } = useTheme()
  const primary = isDark ? '#818cf8' : '#6366f1'
  const secondary = isDark ? '#c084fc' : '#a78bfa'

  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 0.85} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color={primary} />
      <AccentSphere position={[-1.2, 0.4, 0]} scale={0.55} color={primary} />
      <AccentSphere position={[1.4, -0.6, -0.5]} scale={0.35} color={secondary} />
      <AccentSphere position={[0.2, 1.1, 0.3]} scale={0.22} color={isDark ? '#38bdf8' : '#60a5fa'} />
    </>
  )
}

export default function SectionAccent3D({ className = '' }) {
  return (
    <div className={`section-accent-3d pointer-events-none ${className}`} aria-hidden>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <AccentScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
