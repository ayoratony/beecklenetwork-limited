'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

function TechSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.LineBasicMaterial>(null!)
  
  // Create a wireframe sphere with tech aesthetic
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 32, 32)
    const wireframe = new THREE.WireframeGeometry(geo)
    return wireframe
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    
    if (materialRef.current) {
      materialRef.current.color.setHSL(0.5, 1, Math.sin(state.clock.elapsedTime) * 0.2 + 0.7)
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          ref={materialRef}
          color="#00F3FF"
          transparent
          opacity={0.9}
        />
      </lineSegments>
    </mesh>
  )
}

function TechNodes() {
  const nodesRef = useRef<THREE.Group>(null!)
  
  const nodes = useMemo(() => {
    const nodePositions = []
    for (let i = 0; i < 20; i++) {
      const radius = 4 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      nodePositions.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ],
        scale: 0.1 + Math.random() * 0.1
      })
    }
    return nodePositions
  }, [])
  
  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <group ref={nodesRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position as [number, number, number]}>
          <sphereGeometry args={[node.scale, 8, 8]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={1.0}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function Connections() {
  const linesRef = useRef<THREE.Group>(null!)
  
  const connections = useMemo(() => {
    const lines = []
    const nodePositions = []
    
    // Generate node positions for connections
    for (let i = 0; i < 12; i++) {
      const radius = 3 + Math.random() * 2
      const theta = (i / 12) * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.5
      
      nodePositions.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ))
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j])
        if (distance < 3) {
          const points = [nodePositions[i], nodePositions[j]]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          
          lines.push({
            geometry,
            opacity: Math.max(0.2, 1 - distance / 3)
          })
        }
      }
    }
    
    return lines
  }, [])
  
  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => (
        <line key={index} geometry={connection.geometry}>
          <lineBasicMaterial
            color="#2563EB"
            transparent
            opacity={connection.opacity * 1.5}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-tech-deep-space">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [-3, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          className="w-full h-full"
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F3FF" />
          <pointLight position={[-10, -10, -10]} intensity={1.0} color="#7C3AED" />
          
          <TechSphere />
          <TechNodes />
          <Connections />
          
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start z-10 pointer-events-none">
        {/* Gradient Backdrop for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-tech-deep-space/95 via-tech-deep-space/70 to-transparent" />
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-auto">
          <div className="max-w-3xl space-y-8 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black tracking-wider leading-tight">
              <span className="holographic-text drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                BEECKLE
              </span>
              <br />
              <span className="text-white drop-shadow-lg">
                NETWORK
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-tech-cyber-silver font-rajdhani font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed drop-shadow-md">
              Transforming businesses through <span className="text-tech-neon-cyan">cutting-edge</span> technology solutions and digital innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start pt-4">
              <button className="relative px-8 py-4 bg-tech-neon-cyan text-tech-deep-space font-orbitron font-bold text-lg tracking-widest clip-path-polygon hover:bg-white hover:text-tech-neon-cyan transition-all duration-300 hover:scale-105 tech-button-glow group overflow-hidden">
                <span className="relative z-10">EXPLORE SERVICES</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <button className="relative px-8 py-4 bg-transparent text-tech-neon-cyan font-orbitron font-bold text-lg tracking-widest clip-path-polygon border border-tech-neon-cyan/50 hover:border-tech-neon-cyan hover:bg-tech-neon-cyan/10 transition-all duration-300 hover:scale-105 tech-button-glow backdrop-blur-sm">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}