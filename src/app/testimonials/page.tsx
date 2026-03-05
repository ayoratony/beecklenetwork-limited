import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'John Smith',
    company: 'Tech Innovations Inc',
    role: 'CEO',
    content: 'Beeckle Network delivered an exceptional website that exceeded our expectations. Their attention to detail and technical expertise is outstanding. The team was professional, responsive, and delivered on time.',
    rating: 5,
    image: '/images/testimonial1.jpg',
    service: 'Website Development'
  },
  {
    name: 'Sarah Johnson',
    company: 'Secure Solutions Ltd',
    role: 'CTO',
    content: 'Professional service and excellent results. The security system they installed has been flawless. Their expertise in cybersecurity and network design is truly impressive.',
    rating: 5,
    image: '/images/testimonial2.jpg',
    service: 'Security Systems'
  },
  {
    name: 'Michael Chen',
    company: 'Digital Dynamics',
    role: 'Product Manager',
    content: 'Great communication and project management. They delivered our mobile app on time and within budget. The quality of work and attention to user experience was remarkable.',
    rating: 4,
    image: '/images/testimonial3.jpg',
    service: 'Mobile App Development'
  },
  {
    name: 'Emily Rodriguez',
    company: 'Cloud First Inc',
    role: 'Operations Director',
    content: 'The cloud migration project was seamless. Their team handled everything professionally and our systems have never been more reliable. Highly recommended!',
    rating: 5,
    image: '/images/testimonial4.jpg',
    service: 'Cloud Integration'
  },
  {
    name: 'David Kim',
    company: 'Network Pro Solutions',
    role: 'IT Manager',
    content: 'Outstanding network design and implementation. The BGP and OSPF configurations have significantly improved our network performance and reliability.',
    rating: 5,
    image: '/images/testimonial5.jpg',
    service: 'Network Design'
  },
  {
    name: 'Lisa Thompson',
    company: 'AutoFlow Systems',
    role: 'Business Analyst',
    content: 'The automation solutions implemented by Beeckle Network have transformed our business processes. Efficiency has increased by 300% since implementation.',
    rating: 5,
    image: '/images/testimonial6.jpg',
    service: 'System Automation'
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-tech-deep-space pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6">
            Client <span className="holographic-text">Testimonials</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Don&apos;t just take our word for it. Here&apos;s what our clients say about working with Beeckle Network.
          </p>
          <div className="flex justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-white font-semibold ml-2">4.9/5 Average Rating</span>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <Card key={index} className="bg-tech-midnight border-white/10 p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-gray-300">{testimonial.role}</p>
                    <p className="text-tech-neon-cyan font-medium">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                
                <blockquote className="relative">
                  <Quote className="w-8 h-8 text-tech-neon-cyan/30 absolute -top-2 -left-2" />
                  <p className="text-gray-300 italic text-lg leading-relaxed">
                    {testimonial.content}
                  </p>
                </blockquote>
                
                <div className="mt-6">
                  <Badge className="bg-tech-neon-cyan/20 text-tech-neon-cyan border-tech-neon-cyan/30">
                    {testimonial.service}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* All Testimonials */}
          <h2 className="text-3xl font-orbitron font-bold text-white mb-12 text-center">
            What Our <span className="text-tech-electric-blue">Clients Say</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-tech-midnight border-white/10 p-6 group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
                
                <blockquote className="mb-4">
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                </blockquote>
                
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                    {testimonial.service}
                  </Badge>
                  <span className="text-gray-500 text-xs">{testimonial.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-midnight/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">
            Join Our <span className="holographic-text">Satisfied Clients</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the same level of excellence that has earned us a 4.9/5 rating from our clients.
          </p>
          <Button size="lg" className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue hover:neon-glow transition-all text-lg px-8 py-3">
            Start Your Project Today
          </Button>
        </div>
      </section>
    </div>
  )
}
