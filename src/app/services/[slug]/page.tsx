'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase, Service } from '@/lib/supabase'
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchService() {
      if (!slug) return

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) {
        console.error('Error fetching service:', error)
      } else {
        setService(data as Service | null)
      }
      setLoading(false)
    }
    fetchService()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-tech-deep-space flex items-center justify-center">
        <Loader2 className="animate-spin text-tech-neon-cyan h-8 w-8" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-tech-deep-space flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-gray-400 mb-8">The service you are looking for does not exist.</p>
        <Link href="/services">
          <Button variant="outline" className="border-tech-neon-cyan text-tech-neon-cyan hover:bg-tech-neon-cyan hover:text-tech-deep-space">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tech-deep-space text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-tech-midnight/50 border-b border-white/10">
        <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/services" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="inline-block px-4 py-1 rounded-full bg-tech-neon-cyan/10 text-tech-neon-cyan text-sm font-medium border border-tech-neon-cyan/20 mb-4">
                {service.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-white">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>
            
            {service.icon_url && (
              <div className="hidden md:flex h-32 w-32 bg-tech-midnight border border-white/10 rounded-2xl items-center justify-center shadow-lg shadow-tech-neon-cyan/5">
                <Image
                  src={service.icon_url}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="h-16 w-16"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-tech-midnight p-8 rounded-lg border border-white/10">
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Overview</h2>
              <div className="prose prose-invert max-w-none text-gray-300">
                <p>
                  Our {service.title} service is designed to provide robust, scalable, and secure solutions for your business.
                  We leverage the latest technologies and industry best practices to ensure optimal performance and reliability.
                </p>
                <p className="mt-4">
                  Whether you are a startup looking to establish your digital presence or an enterprise seeking to optimize your operations,
                  our team of experts is ready to assist you every step of the way.
                </p>
              </div>
            </div>

            <div className="bg-tech-midnight p-8 rounded-lg border border-white/10">
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">Key Features</h2>
              <ul className="grid gap-4">
                {[
                  'Customized Implementation Strategy',
                  'Comprehensive Documentation & Training',
                  'Ongoing Maintenance & Support',
                  'Performance Optimization & Monitoring',
                  'Security-First Approach'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-tech-neon-cyan mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-tech-midnight to-tech-deep-space p-8 rounded-lg border border-tech-neon-cyan/30 shadow-lg shadow-tech-neon-cyan/5 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-white">Get Started</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Ready to upgrade your {service.title.toLowerCase()}? Contact us today for a free consultation.
              </p>
              <Link href="/contact">
                <Button className="w-full bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue font-bold">
                  Request Quote
                </Button>
              </Link>
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-gray-500 mb-2">Have questions?</p>
                <a href="mailto:contact@beecklenetwork.com" className="text-tech-neon-cyan hover:underline text-sm">
                  contact@beecklenetwork.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
