import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Smartphone, Shield, Network, Bot, Cloud, ArrowRight, Zap, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Hero3DWrapper from '@/components/Hero3DWrapper'
import { getSupabaseClient, type Service } from '@/lib/supabase'

const iconMap: Record<string, LucideIcon> = {
  'Web Dev': Code,
  'Software': Smartphone,
  'Security': Shield,
  'Network': Network,
  'Automation': Bot,
  'Cloud': Cloud,
}

const colorMap: Record<string, string> = {
  'Web Dev': 'text-tech-neon-cyan',
  'Software': 'text-tech-electric-blue',
  'Security': 'text-tech-holographic-purple',
  'Network': 'text-tech-neon-cyan',
  'Automation': 'text-tech-electric-blue',
  'Cloud': 'text-tech-holographic-purple',
}

const fallbackServices: Partial<Service>[] = [
  {
    id: '1',
    title: 'Website Development',
    description: 'Custom websites with modern technologies, responsive design, and optimal performance.',
    slug: 'website-development',
    category: 'Web Dev',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
    slug: 'mobile-app-development',
    category: 'Software',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Security Systems',
    description: 'CCTV installation, biometrics, access control, and comprehensive security solutions.',
    slug: 'security-systems',
    category: 'Security',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Network Design',
    description: 'Enterprise network architecture with BGP, OSPF, VRF, and MPLS configurations.',
    slug: 'network-design',
    category: 'Network',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'System Automation',
    description: 'Business process automation with n8n, Zoho platform, and AI integration.',
    slug: 'system-automation',
    category: 'Automation',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Cloud Integration',
    description: 'Seamless cloud system integration and migration services for modern businesses.',
    slug: 'cloud-integration',
    category: 'Cloud',
    created_at: new Date().toISOString()
  }
]

async function getServices() {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Supabase error, using fallback data:', error.message)
      return fallbackServices as Service[]
    }
    return data as Service[]
  } catch (error) {
    console.warn('Fetch error, using fallback data', error)
    return fallbackServices as Service[]
  }
}

export default async function Home() {
  const services = await getServices()

  return (
    <div className="min-h-screen bg-tech-deep-space">
      {/* Hero Section with 3D Animation */}
      <section className="relative">
        <Suspense fallback={<div className="h-screen bg-tech-deep-space" />}>
          <Hero3DWrapper />
        </Suspense>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 glitch-text" data-text="Our Services">
              Our <span className="holographic-text">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to transform your business and drive digital innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.category] || Code
              const colorClass = colorMap[service.category] || 'text-tech-neon-cyan'
              
              return (
                <Card key={service.id} className="cyber-card border-white/10 group">
                  <div className="cyber-card-corner corner-tl" />
                  <div className="cyber-card-corner corner-tr" />
                  <div className="cyber-card-corner corner-bl" />
                  <div className="cyber-card-corner corner-br" />
                  
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-white/5 group-hover:bg-tech-neon-cyan/20 transition-colors`}>
                        <Icon className={`w-8 h-8 ${colorClass}`} />
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-tech-neon-cyan transition-colors">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4">
                      {service.description}
                    </CardDescription>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center text-tech-neon-cyan hover:text-tech-electric-blue transition-colors group-hover:translate-x-2 duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-midnight/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tech-neon-cyan to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tech-holographic-purple to-transparent opacity-50"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6 glitch-text" data-text="Ready to Transform?">
            Ready to <span className="holographic-text">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto typing-effect w-fit mx-auto border-r-2 border-tech-neon-cyan pr-2">
            Let&apos;s discuss how our technology solutions can help you achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue hover:neon-glow transition-all text-lg px-8 py-6 rounded-none clip-path-polygon relative overflow-hidden group">
              <span className="relative z-10 flex items-center">
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Get Started
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Button>
            <Button size="lg" variant="outline" className="border-tech-neon-cyan text-tech-neon-cyan hover:bg-tech-neon-cyan/10 hover:text-white transition-all text-lg px-8 py-6 rounded-none clip-path-polygon">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
