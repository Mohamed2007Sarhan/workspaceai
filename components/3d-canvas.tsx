"use client"

import React, { useState, useEffect, useRef } from "react"

export default function CanvasWrapper({ onCreated }: { onCreated: () => void }) {
  const [ThreeComponents, setThreeComponents] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dynamically import Three.js components only when mounted
    const loadThreeComponents = async () => {
      try {
        const [
          { Canvas, useFrame },
          { OrbitControls, Float, Text3D, Environment, PerspectiveCamera }
        ] = await Promise.all([
          import("@react-three/fiber"),
          import("@react-three/drei")
        ])

        // Create the Three.js components
        const BusinessChart = ({ position }: { position: [number, number, number] }) => {
          const meshRef = React.useRef<any>(null)

          useFrame((state: any) => {
            if (meshRef.current) {
              meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
              meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
            }
          })

          return (
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <group ref={meshRef} position={position}>
                {/* Chart Bars */}
                {[1, 1.5, 2, 1.2, 2.5, 1.8, 3].map((height, i) => (
                  <mesh key={i} position={[i * 0.3 - 1, height / 2, 0]}>
                    <boxGeometry args={[0.2, height, 0.2]} />
                    <meshStandardMaterial color={`hsl(${240 + i * 20}, 70%, 60%)`} />
                  </mesh>
                ))}

                {/* Base */}
                <mesh position={[0, -0.1, 0]}>
                  <boxGeometry args={[2.5, 0.1, 1]} />
                  <meshStandardMaterial color="#1a1a2e" />
                </mesh>
              </group>
            </Float>
          )
        }

        const FloatingIcon = ({ position, icon }: { position: [number, number, number]; icon: string }) => {
          const meshRef = React.useRef<any>(null)

          useFrame((state: any) => {
            if (meshRef.current) {
              meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
              meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
            }
          })

          return (
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
              <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.2} transparent opacity={0.8} />
                <Text3D font="/fonts/Geist_Bold.json" size={0.2} height={0.02} position={[-0.1, -0.1, 0.31]}>
                  {icon}
                  <meshStandardMaterial color="#ffffff" />
                </Text3D>
              </mesh>
            </Float>
          )
        }

        const AIBrain = ({ position }: { position: [number, number, number] }) => {
          const meshRef = React.useRef<any>(null)

          useFrame((state: any) => {
            if (meshRef.current) {
              meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
              meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
            }
          })

          return (
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
              <group ref={meshRef} position={position}>
                {/* Main Brain Shape */}
                <mesh>
                  <sphereGeometry args={[0.8, 32, 32]} />
                  <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.1} transparent opacity={0.7} />
                </mesh>

                {/* Neural Network Lines */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <mesh key={i} position={[Math.sin(i * 0.3) * 0.9, Math.cos(i * 0.3) * 0.9, Math.sin(i * 0.5) * 0.9]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} />
                  </mesh>
                ))}
              </group>
            </Float>
          )
        }

        const ThreeScene = () => (
          <Canvas onCreated={onCreated} camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

            {/* Environment */}
            <Environment preset="city" />

            {/* 3D Elements */}
            <BusinessChart position={[-3, 0, 0]} />
            <AIBrain position={[0, 0, 0]} />
            <FloatingIcon position={[3, 1, 0]} icon="📊" />
            <FloatingIcon position={[-2, 2, 1]} icon="💼" />
            <FloatingIcon position={[2, -1, -1]} icon="🤖" />
            <FloatingIcon position={[0, 2.5, 1]} icon="📈" />

            {/* Controls */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        )

        setThreeComponents(() => ThreeScene)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load Three.js components:", error)
        setIsLoading(false)
      }
    }

    loadThreeComponents()
  }, [onCreated])

  if (isLoading) {
    return <div className="w-full h-full bg-gray-900 animate-pulse" />
  }

  if (!ThreeComponents) {
    return <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">Failed to load 3D scene</div>
  }

  return <ThreeComponents />
}
