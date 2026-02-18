import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere } from '@react-three/drei'
import type { Group } from 'three'

interface Building {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
}

interface CityScapeProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function CityScape({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: CityScapeProps) {
  const groupRef = useRef<Group>(null)

  // Generate building data
  const buildings = useMemo<Building[]>(() => {
    const result: Building[] = []
    const gridSize = 8
    const spacing = 1.2

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let z = -gridSize / 2; z < gridSize / 2; z++) {
        // Skip center area for focal point
        if (Math.abs(x) < 1 && Math.abs(z) < 1) continue

        const height = 0.5 + Math.random() * 2.5
        const width = 0.3 + Math.random() * 0.4
        const depth = 0.3 + Math.random() * 0.4

        // Distance-based color (closer = brighter)
        const distance = Math.sqrt(x * x + z * z)
        const brightness = Math.max(0.1, 0.4 - distance * 0.03)

        result.push({
          position: [
            x * spacing + (Math.random() - 0.5) * 0.3,
            height / 2,
            z * spacing + (Math.random() - 0.5) * 0.3,
          ],
          scale: [width, height, depth],
          color: `hsl(${260 + Math.random() * 40}, 70%, ${brightness * 100}%)`,
        })
      }
    }
    return result
  }, [])

  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Ground plane */}
      <Box args={[15, 0.05, 15]} position={[0, -0.025, 0]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Buildings */}
      {buildings.map((building, i) => (
        <Box key={i} args={building.scale} position={building.position}>
          <meshStandardMaterial
            color={building.color}
            metalness={0.7}
            roughness={0.3}
            emissive={building.color}
            emissiveIntensity={0.1}
          />
        </Box>
      ))}

      {/* Washington Monument (DC landmark) */}
      <group position={[0, 0, 0]}>
        <Box args={[0.3, 4, 0.3]} position={[0, 2, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.2}
            roughness={0.6}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </Box>
        {/* Pyramid top */}
        <mesh position={[0, 4.15, 0]}>
          <coneGeometry args={[0.2, 0.3, 4]} />
          <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>

      {/* Capitol dome silhouette */}
      <group position={[3, 0, -2]}>
        <Box args={[1.5, 0.8, 0.8]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#2a2a4a" metalness={0.5} roughness={0.4} />
        </Box>
        <Sphere args={[0.5, 16, 16]} position={[0, 1.1, 0]}>
          <meshStandardMaterial
            color="#3a3a5a"
            metalness={0.6}
            roughness={0.3}
            emissive="#4a4a6a"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </group>

      {/* Ambient particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.02, 8, 8]}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 5 + 1,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  )
}
