import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ── Inner icosahedron ── */
function IcosahedronMesh({ scrollY }) {
  const meshRef = useRef()
  const wireRef = useRef()
  const outerRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const scroll = scrollY.current || 0

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.18 + scroll * 0.003
      meshRef.current.rotation.y = t * 0.24
      meshRef.current.rotation.z = t * 0.10
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.12 + scroll * 0.002
      wireRef.current.rotation.y = -t * 0.18
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.06
      outerRef.current.rotation.y = t * 0.09
    }
  })

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 1), [])
  const outerGeo = useMemo(() => new THREE.IcosahedronGeometry(2.6, 1), [])

  return (
    <group>
      {/* Outer transparent shell */}
      <mesh ref={outerRef} geometry={outerGeo}>
        <meshBasicMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Glassy core */}
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.4}
          roughness={0.02}
          transmission={0.96}
          ior={1.5}
          chromaticAberration={0.06}
          distortion={0.35}
          distortionScale={0.3}
          temporalDistortion={0.15}
          color="#0a1a2e"
          attenuationColor="#00f5ff"
          attenuationDistance={2}
        />
      </mesh>

      {/* Cyan wireframe */}
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Vertex points glow */}
      <points geometry={geometry}>
        <pointsMaterial
          color="#00f5ff"
          size={0.07}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

/* ── Floating particles ── */
function Particles() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#bf5fff"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Orbit ring ── */
function OrbitRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.3
    }
  })

  const geo = useMemo(() => new THREE.TorusGeometry(3.8, 0.012, 4, 80), [])

  return (
    <mesh ref={ref} geometry={geo} rotation={[Math.PI / 2.8, 0.2, 0]}>
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.35} />
    </mesh>
  )
}

/* ── Camera rig reacts to mouse ── */
function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene({ scrollY }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[-4, -2, -4]} intensity={1} color="#bf5fff" />
      <pointLight position={[0, -4, 2]} intensity={0.5} color="#7b8fff" />

      <Stars radius={60} depth={30} count={1200} factor={3} fade speed={0.4} />
      <Particles />
      <OrbitRing />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        <IcosahedronMesh scrollY={scrollY} />
      </Float>

      <Environment preset="night" background={false} />
      <CameraRig />
    </Canvas>
  )
}
