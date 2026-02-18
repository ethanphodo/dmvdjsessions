import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Ring, Box } from '@react-three/drei'
import type { Group, Mesh } from 'three'

interface TurntableProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  isPlaying?: boolean
}

export default function Turntable({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  isPlaying = true,
}: TurntableProps) {
  const groupRef = useRef<Group>(null)
  const platterRef = useRef<Mesh>(null)
  const vinylRef = useRef<Mesh>(null)
  const tonearmRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!isPlaying) return

    // Rotate vinyl and platter
    if (platterRef.current) {
      platterRef.current.rotation.y += delta * 0.5
    }
    if (vinylRef.current) {
      vinylRef.current.rotation.y += delta * 0.5
    }

    // Subtle tonearm movement
    if (tonearmRef.current) {
      tonearmRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Base/Cabinet */}
      <Box args={[3, 0.3, 2.5]} position={[0, -0.15, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Platter base */}
      <Cylinder ref={platterRef} args={[1.1, 1.1, 0.1, 64]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Vinyl record */}
      <group ref={vinylRef} position={[0, 0.16, 0]}>
        {/* Main vinyl body */}
        <Cylinder args={[1, 1, 0.02, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.4} />
        </Cylinder>

        {/* Label */}
        <Cylinder args={[0.2, 0.2, 0.025, 32]} position={[0, 0.01, 0]}>
          <meshStandardMaterial color="#E21D1D" metalness={0.2} roughness={0.6} />
        </Cylinder>

        {/* Grooves (rings) */}
        {[0.3, 0.5, 0.7, 0.85].map((radius, i) => (
          <Ring key={i} args={[radius - 0.02, radius, 64]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
            <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} transparent opacity={0.5} />
          </Ring>
        ))}
      </group>

      {/* Spindle */}
      <Cylinder args={[0.03, 0.03, 0.15, 16]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Tonearm assembly */}
      <group ref={tonearmRef} position={[1.2, 0.3, 0.8]}>
        {/* Pivot base */}
        <Cylinder args={[0.08, 0.1, 0.15, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </Cylinder>

        {/* Arm */}
        <group rotation={[0, -0.5, 0]}>
          <Box args={[0.8, 0.03, 0.03]} position={[-0.4, 0.1, 0]} rotation={[0, 0, -0.1]}>
            <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
          </Box>

          {/* Headshell */}
          <Box args={[0.12, 0.04, 0.06]} position={[-0.85, 0.06, 0]} rotation={[0, 0, -0.1]}>
            <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
          </Box>

          {/* Cartridge */}
          <Box args={[0.06, 0.03, 0.03]} position={[-0.92, 0.04, 0]}>
            <meshStandardMaterial color="#222" metalness={0.5} roughness={0.3} />
          </Box>
        </group>

        {/* Counterweight */}
        <Cylinder args={[0.06, 0.06, 0.08, 16]} position={[0.15, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
        </Cylinder>
      </group>

      {/* Pitch fader area */}
      <Box args={[0.3, 0.05, 0.8]} position={[1.2, 0, -0.4]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
      </Box>

      {/* Pitch fader */}
      <Box args={[0.08, 0.06, 0.5]} position={[1.2, 0.03, -0.4]}>
        <meshStandardMaterial color="#E21D1D" metalness={0.4} roughness={0.5} />
      </Box>

      {/* Start/Stop button */}
      <Cylinder args={[0.1, 0.1, 0.03, 32]} position={[-1.2, 0.05, 0.8]}>
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* Power LED */}
      <Cylinder args={[0.02, 0.02, 0.01, 8]} position={[-1.2, 0.07, 0.5]}>
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={isPlaying ? 2 : 0.2}
        />
      </Cylinder>
    </group>
  )
}
