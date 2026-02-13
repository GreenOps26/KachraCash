"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"
import { Float, Environment } from "@react-three/drei"

function FloatingWaste() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="#10b981" wireframe />
        </mesh>
    </Float>
  )
}

export function Hero3D() {
  return (
    <div className="h-[400px] w-full md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingWaste />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
