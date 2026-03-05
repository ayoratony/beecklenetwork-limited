import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-web-development-2024',
    excerpt: 'Explore the latest trends in web development including AI integration, serverless architecture, and the evolution of JavaScript frameworks.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Web Development', 'Technology', 'Trends'],
    image: '/images/blog1.jpg',
    featured: true
  },
  {
    title: 'Cybersecurity Best Practices for Modern Businesses',
    slug: 'cybersecurity-best-practices-2024',
    excerpt: 'Essential cybersecurity practices every business should implement to protect against evolving digital threats in 2024.',
    author: 'Michael Chen',
    date: '2024-01-10',
    readTime: '12 min read',
    tags: ['Security', 'Cybersecurity', 'Business'],
    image: '/images/blog2.jpg',
    featured: true
  },
  {
    title: 'Mobile App Development: Native vs Cross-Platform',
    slug: 'mobile-app-development-comparison',
    excerpt: 'A comprehensive comparison of native and cross-platform mobile development approaches for your next project.',
    author: 'Alex Rodriguez',
    date: '2024-01-05',
    readTime: '10 min read',
    tags: ['Mobile Development', 'React Native', 'Flutter'],
    image: '/images/blog3.jpg',
    featured: false
  },
  {
    title: 'Network Security: Implementing BGP and OSPF Protocols',
    slug: 'network-security-bgp-ospf',
    excerpt: 'Learn how to implement BGP and OSPF protocols for enhanced network security and performance.',
    author: 'David Kim',
    date: '2023-12-28',
    readTime: '15 min read',
    tags: ['Network', 'Security', 'BGP', 'OSPF'],
    image: '/images/blog4.jpg',
    featured: false
  },
  {
    title: 'Business Process Automation with n8n and AI',
    slug: 'business-automation-n8n-ai',
    excerpt: 'Discover how to leverage n8n and AI technologies to automate your business processes effectively.',
    author: 'Emma Thompson',
    date: '2023-12-20',
    readTime: '11 min read',
    tags: ['Automation', 'n8n', 'AI', 'Business'],
    image: '/images/blog5.jpg',
    featured: false
  },
  {
    title: 'Cloud Migration Strategies for Enterprise',
    slug: 'cloud-migration-enterprise-strategy',
    excerpt: 'Best practices and strategies for successful cloud migration in enterprise environments.',
    author: 'Robert Lee',
    date: '2023-12-15',
    readTime: '14 min read',
    tags: ['Cloud', 'Migration', 'Enterprise', 'AWS'],
    image: '/images/blog6.jpg',
    featured: false
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-tech-deep-space pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6">
            Technology <span className="holographic-text">Insights</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Stay updated with the latest trends, best practices, and insights in technology and digital transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Web Development', 'Security', 'Mobile', 'Cloud', 'Automation', 'Network'].map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 hover:bg-tech-neon-cyan/20 cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-orbitron font-bold text-white mb-12 text-center">
            Featured <span className="text-tech-neon-cyan">Articles</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blogPosts.filter(post => post.featured).map((post, index) => (
              <Card key={index} className="bg-tech-midnight border-white/10 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
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
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-white/10 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Blog Posts */}
          <h2 className="text-3xl font-orbitron font-bold text-white mb-12 text-center">
            Latest <span className="text-tech-electric-blue">Posts</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-tech-midnight border-white/10 group">
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-tech-neon-cyan transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-white/20 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{post.readTime}</span>
                    <Button size="sm" className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue transition-colors">
                      Read
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tech-midnight/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">
            Stay <span className="holographic-text">Updated</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest technology insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-tech-midnight border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-tech-neon-cyan"
            />
            <Button className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue transition-colors px-6 py-3">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}