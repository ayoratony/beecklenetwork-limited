import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ExternalLink, Github, Globe } from 'lucide-react'
import Image from 'next/image'
import { supabase, type Project } from '@/lib/supabase'

const fallbackProjects: Partial<Project>[] = [
  {
    id: '1',
    title: 'Corporate Website Redesign',
    description: 'Complete redesign of corporate website with modern UI/UX, improved performance, and mobile-first approach.',
    client: 'Tech Innovations Inc',
    completion_date: '2024-01-15',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    images: ['/images/project1.jpg'],
    website_url: 'https://tech-innovations.com',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication and real-time transaction processing.',
    client: 'Finance Bank',
    completion_date: '2023-12-20',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Security'],
    images: ['/images/project2.jpg'],
    website_url: 'https://finance-bank.com/app',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Retail Security System',
    description: 'Comprehensive security system for retail chain including CCTV, access control, and alarm integration.',
    client: 'Retail Chain Solutions',
    completion_date: '2023-11-30',
    tags: ['Security', 'IoT', 'Cloud', 'Monitoring'],
    images: ['/images/project3.jpg'],
    website_url: 'https://retail-security.com',
    featured: false,
    created_at: new Date().toISOString()
  }
]

async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('completion_date', { ascending: false })

    if (error) {
      console.warn('Supabase error, using fallback data:', error.message)
      return fallbackProjects as Project[]
    }
    return data as Project[]
  } catch (e) {
    console.warn('Fetch error, using fallback data')
    return fallbackProjects as Project[]
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-tech-deep-space pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6">
            Our <span className="holographic-text">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our latest projects and see how we've helped businesses transform through innovative technology solutions.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-orbitron font-bold text-white mb-12 text-center">
            Featured <span className="text-tech-neon-cyan">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.filter(p => p.featured).map((project, index) => (
              <Card key={project.id} className="bg-tech-midnight border-white/10 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.images?.[0] || '/images/project-placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-tech-neon-cyan text-tech-deep-space">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-white group-hover:text-tech-neon-cyan transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {project.client} • {new Date(project.completion_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-white/10 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.website_url && (
                      <Button className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue transition-colors" asChild>
                        <a href={project.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" className="border-tech-neon-cyan text-tech-neon-cyan hover:bg-tech-neon-cyan hover:text-tech-deep-space transition-colors">
                      Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Projects */}
          <h2 className="text-3xl font-orbitron font-bold text-white mb-12 text-center">
            All <span className="text-tech-electric-blue">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={project.id} className="bg-tech-midnight border-white/10 group">
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-tech-neon-cyan transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {project.client}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-white/20 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(project.completion_date).toLocaleDateString()}
                    </span>
                    <Button size="sm" className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue transition-colors">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-midnight/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">
            Ready to Start Your <span className="holographic-text">Project</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our innovative technology solutions.
          </p>
          <Button size="lg" className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue hover:neon-glow transition-all text-lg px-8 py-3">
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  )
}