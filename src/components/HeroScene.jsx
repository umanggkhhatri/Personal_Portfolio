import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
  Sphere,
  TorusKnot,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext.jsx'

function useSceneColors() {
  const { isDark } = useTheme()
  return useMemo(
    () => ({
      primary: isDark ? '#818cf8' : '#6366f1',
      secondary: isDark ? '#c084fc' : '#a78bfa',
      glass: isDark ? '#1e1e2e' : '#f8fafc',
      env: isDark ? 'night' : 'city',
    }),
    [isDark],
  )
}

function IcosahedronMesh({ scrollY, colors }) {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const scroll = scrollY.current || 0
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15 + scroll * 0.002
      meshRef.current.rotation.y = t * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1
      wireRef.current.rotation.y = -t * 0.15
    }
  })

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.6, 1), [])

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.35}
          roughness={0.05}
          transmission={0.94}
          ior={1.45}
          chromaticAberration={0.04}
          color={colors.glass}
          attenuationColor={colors.primary}
          attenuationDistance={2.5}
        />
      </mesh>
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial color={colors.primary} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function FloatingTorus({ colors }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.x = clock.getElapsedTime() * 0.12
  })
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot ref={ref} args={[0.9, 0.22, 128, 16]} position={[2.8, 0.5, -1]}>
        <meshStandardMaterial
          color={colors.secondary}
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.85}
        />
      </TorusKnot>
    </Float>
  )
}

function FloatingSpheres({ colors }) {
  return (
    <>
      <Float speed={2} floatIntensity={1.2}>
        <Sphere args={[0.35, 32, 32]} position={[-2.5, 1.2, 0]}>
          <meshStandardMaterial color={colors.primary} metalness={0.4} roughness={0.3} />
        </Sphere>
      </Float>
      <Float speed={1.6} floatIntensity={0.9}>
        <Sphere args={[0.2, 24, 24]} position={[2, -1.5, 0.5]}>
          <meshStandardMaterial color={colors.secondary} metalness={0.5} roughness={0.2} />
        </Sphere>
      </Float>
    </>
  )
}

function Particles({ color }) {
  const count = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.035} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04
    camera.position.y += (mouse.y * 0.25 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

function SceneContent({ scrollY }) {
  const colors = useSceneColors()
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color={colors.primary} />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color={colors.secondary} />
      <Particles color={colors.secondary} />
      <FloatingSpheres colors={colors} />
      <FloatingTorus colors={colors} />
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
        <IcosahedronMesh scrollY={scrollY} colors={colors} />
      </Float>
      <Environment preset={colors.env} background={false} />
      <CameraRig />
    </>
  )
}

export default function HeroScene({ scrollY }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 48 }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <SceneContent scrollY={scrollY} />
    </Canvas>
  )
}
