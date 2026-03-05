'use client'

import dynamic from 'next/dynamic'

// Client component wrapper for the 3D hero component
const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-tech-deep-space flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-orbitron font-bold text-white mb-4">
          <span className="holographic-text">BEECKLE</span>
          <br />
          <span className="text-tech-neon-cyan">NETWORK</span>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Transforming businesses through cutting-edge technology solutions
        </p>
      </div>
    </div>
  )
})

export default Hero3D