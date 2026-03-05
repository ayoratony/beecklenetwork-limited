'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Code, Smartphone, Shield, Network, Zap, Cloud, Bot } from 'lucide-react'
import { useState } from 'react'

const services = [
  { name: 'Website Development', href: '/services/website-development', icon: Code },
  { name: 'Mobile Apps', href: '/services/mobile-app-development', icon: Smartphone },
  { name: 'Security Systems', href: '/services/security-systems', icon: Shield },
  { name: 'Network Design', href: '/services/network-design', icon: Network },
  { name: 'Automation', href: '/services/system-automation', icon: Bot },
  { name: 'Cloud Integration', href: '/services/cloud-integration', icon: Cloud },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-orbitron font-bold holographic-text">
              BEECKLE
            </div>
            <span className="text-tech-neon-cyan font-semibold">NETWORK</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
              Services
            </Link>
            <Link href="/portfolio" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
              Portfolio
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
              Contact
            </Link>
            <Button className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue hover:neon-glow transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-tech-neon-cyan transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 mt-4 pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/services" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
                Services
              </Link>
              <Link href="/portfolio" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-tech-neon-cyan transition-colors">
                Contact
              </Link>
              <Button className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue hover:neon-glow transition-all">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}