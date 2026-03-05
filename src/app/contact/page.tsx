'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

const services = [
  'Website Development',
  'Mobile App Development',
  'Security Systems',
  'Network Design',
  'System Automation',
  'Cloud Integration',
  'General Inquiry'
]

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form submitted:', data)
      setSubmitSuccess(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-tech-deep-space pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6">
            Get In <span className="holographic-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Ready to transform your business? Let's discuss how our technology solutions can help you achieve your goals.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-tech-midnight border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                <CardDescription className="text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Thank you! Your message has been sent successfully.</span>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-tech-neon-cyan"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-tech-neon-cyan"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-tech-neon-cyan"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-white">Service Interest *</Label>
                    <Select onValueChange={(value) => register('service').onChange({ target: { value } })}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-tech-midnight border-white/20">
                        {services.map((service) => (
                          <SelectItem key={service} value={service} className="text-white hover:bg-white/10">
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service && (
                      <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-tech-neon-cyan min-h-[120px]"
                      placeholder="Tell us about your project requirements..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-tech-midnight border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-tech-neon-cyan" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300">info@beecklenetwork.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-tech-neon-cyan" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-tech-neon-cyan" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-300">123 Tech Street<br />Digital City, DC 12345</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-tech-midnight border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">Office Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-tech-neon-cyan" />
                      <span className="text-white text-sm">{schedule.day}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/10 text-gray-300">
                      {schedule.hours}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-tech-midnight border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">Quick Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">
                  We typically respond to inquiries within 2-4 hours during business hours.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Free consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">No obligation quotes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Expert advice</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}