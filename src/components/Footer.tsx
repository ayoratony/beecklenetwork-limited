import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-tech-deep-space border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-orbitron font-bold holographic-text">
              BEECKLE NETWORK
            </div>
            <p className="text-gray-400">
              Transforming businesses through cutting-edge technology solutions and innovative digital transformation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">
                <Github size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/website-development" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Website Development</Link></li>
              <li><Link href="/services/mobile-app-development" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/security-systems" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Security Systems</Link></li>
              <li><Link href="/services/network-design" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Network Design</Link></li>
              <li><Link href="/services/system-automation" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Automation</Link></li>
              <li><Link href="/services/cloud-integration" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Cloud Integration</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-tech-neon-cyan transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-tech-neon-cyan" />
                <span className="text-gray-400">info@beecklenetwork.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-tech-neon-cyan" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-tech-neon-cyan" />
                <span className="text-gray-400">123 Tech Street, Digital City</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue hover:neon-glow transition-all">
                Get Quote
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Beeckle Network. All rights reserved. | 
            <Link href="/privacy" className="hover:text-tech-neon-cyan transition-colors">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-tech-neon-cyan transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}