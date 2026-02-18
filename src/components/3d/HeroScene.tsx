import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import type { Group } from 'three'
import Turntable from './Turntable'

interface ParticlesProps {
  count?: number
}

function Particles({ count = 100 }: ParticlesProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particles = Array.from({ length: count }).map((_, i) => {
    const radius = 3 + Math.random() * 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    return {
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) - 1,
        radius * Math.cos(phi),
      ] as [number, number, number],
      scale: 0.01 + Math.random() * 0.03,
      color: ['#8B5CF6', '#EC4899', '#22D3EE', '#84CC16'][Math.floor(Math.random() * 4)] ?? '#8B5CF6',
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={45} />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        castShadow
        color="#8B5CF6"
      />
      <spotLight
        position={[-5, 5, -5]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#EC4899"
      />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#22D3EE" />

      {/* Main turntable */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.3}
        floatingRange={[-0.1, 0.1]}
      >
        <Turntable
          position={[0, 0, 0]}
          rotation={[-0.2, -0.3, 0]}
          scale={0.8}
          isPlaying={true}
        />
      </Float>

      {/* Ambient particles */}
      <Particles count={80} />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Floor reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  )
}

interface HeroSceneProps {
  className?: string
}

export default function HeroScene({ className = '' }: HeroSceneProps) {
  return (
    <div className={`three-canvas ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
