'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient, Service } from '@/lib/supabase'
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('Error fetching services:', error)
      } else {
        setServices((data as Service[]) || [])
      }
      setLoading(false)
    }
    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-tech-deep-space flex items-center justify-center">
        <Loader2 className="animate-spin text-tech-neon-cyan h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tech-deep-space text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tech-neon-cyan to-tech-holographic-purple">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to drive your business forward.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-tech-midnight p-8 rounded-lg border border-white/10 hover:border-tech-neon-cyan/50 transition-all hover:-translate-y-2 group shadow-lg shadow-tech-neon-cyan/5"
            >
              <div className="mb-6 h-12 w-12 bg-tech-neon-cyan/10 rounded-lg flex items-center justify-center group-hover:bg-tech-neon-cyan/20 transition-colors">
                {service.icon_url ? (
                  <Image
                    src={service.icon_url}
                    alt={service.title}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                    unoptimized
                  />
                ) : (
                  <div className="h-6 w-6 bg-tech-neon-cyan rounded-full opacity-50" />
                )}
              </div>
              
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-white group-hover:text-tech-neon-cyan transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6 line-clamp-3">
                {service.description}
              </p>

              <div className="flex items-center text-tech-neon-cyan font-medium group-hover:text-white transition-colors">
                <span className="mr-2">Learn more</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Link to detail page (future implementation) */}
              <Link href={`/services/${service.slug}`} className="absolute inset-0">
                <span className="sr-only">View {service.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-tech-midnight/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white">Why Choose Beeckle Network?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Expert Team', desc: 'Certified professionals with years of industry experience.' },
              { title: 'Custom Solutions', desc: 'Tailored approaches designed for your specific needs.' },
              { title: '24/7 Support', desc: 'Round-the-clock monitoring and technical assistance.' },
              { title: 'Future Ready', desc: 'Scalable technologies that grow with your business.' }
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-tech-holographic-purple/10 text-tech-holographic-purple mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-tech-midnight to-tech-deep-space border border-white/10 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-tech-neon-cyan/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-tech-holographic-purple/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 text-white relative z-10">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
            Let&apos;s discuss how our services can help you achieve your goals.
          </p>
          <div className="relative z-10">
            <Link href="/contact">
              <Button size="lg" className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue text-lg px-8 py-6 rounded-full shadow-lg shadow-tech-neon-cyan/20 hover:shadow-tech-neon-cyan/40 transition-all">
                Get a Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
