'use client'

import { useEffect, useState } from 'react'
import { supabase, CompanyInfo } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AboutPage() {
  const [info, setInfo] = useState<CompanyInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInfo() {
      const { data } = await supabase.from('company_info').select('*').single()
      setInfo(data)
      setLoading(false)
    }
    fetchInfo()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-tech-deep-space flex items-center justify-center">
        <Loader2 className="animate-spin text-tech-neon-cyan h-8 w-8" />
      </div>
    )
  }

  if (!info) {
    return (
      <div className="min-h-screen bg-tech-deep-space text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Content Not Found</h1>
          <p className="text-gray-400">Please configure the About page in the Admin Dashboard.</p>
        </div>
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
            {info.about_title}
          </h1>
          {info.tagline && (
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {info.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-tech-midnight/50">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {info.about_content}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-tech-midnight p-8 rounded-lg border border-white/10 hover:border-tech-neon-cyan/50 transition-colors shadow-lg shadow-tech-neon-cyan/5">
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-tech-neon-cyan">
              {info.mission_title || 'Our Mission'}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {info.mission_content}
            </p>
          </div>
          <div className="bg-tech-midnight p-8 rounded-lg border border-white/10 hover:border-tech-holographic-purple/50 transition-colors shadow-lg shadow-tech-holographic-purple/5">
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-tech-holographic-purple">
              {info.vision_title || 'Our Vision'}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {info.vision_content}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      {info.values && info.values.length > 0 && (
        <section className="py-20 px-4 bg-tech-midnight/30 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-orbitron font-bold mb-12 text-white">Our Core Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {info.values.map((value, i) => (
                <div key={i} className="p-6 bg-tech-midnight rounded-lg border border-white/10 hover:bg-white/5 hover:border-tech-neon-cyan/30 transition-all group">
                  <span className="text-xl font-bold text-gray-300 group-hover:text-tech-neon-cyan transition-colors">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Snippet */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-orbitron font-bold mb-6">Ready to work with us?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-gray-300">
             {info.contact_email && (
               <div>
                 <span className="block text-sm text-gray-500 mb-1">Email Us</span>
                 <a href={`mailto:${info.contact_email}`} className="text-tech-neon-cyan hover:underline">{info.contact_email}</a>
               </div>
             )}
             {info.contact_phone && (
               <div>
                 <span className="block text-sm text-gray-500 mb-1">Call Us</span>
                 <a href={`tel:${info.contact_phone}`} className="text-tech-neon-cyan hover:underline">{info.contact_phone}</a>
               </div>
             )}
          </div>
        </div>
      </section>
    </div>
  )
}
