'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Briefcase, FileText, Layers, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    services: 0,
    projects: 0,
    posts: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    
    // Fetch counts in parallel
    const [leads, services, projects, posts] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true })
    ])

    setStats({
      leads: leads.count || 0,
      services: services.count || 0,
      projects: projects.count || 0,
      posts: posts.count || 0
    })
    
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-300">Welcome back to the Beeckle Network Admin Panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-tech-midnight border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-tech-neon-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{loading ? '-' : stats.leads}</div>
            <p className="text-xs text-gray-400">
              New inquiries from website
            </p>
          </CardContent>
        </Card>

        <Card className="bg-tech-midnight border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Services</CardTitle>
            <Layers className="h-4 w-4 text-tech-holographic-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{loading ? '-' : stats.services}</div>
            <p className="text-xs text-gray-400">
              Services listed publicly
            </p>
          </CardContent>
        </Card>

        <Card className="bg-tech-midnight border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Portfolio Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-tech-electric-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{loading ? '-' : stats.projects}</div>
            <p className="text-xs text-gray-400">
              Completed projects showcased
            </p>
          </CardContent>
        </Card>

        <Card className="bg-tech-midnight border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{loading ? '-' : stats.posts}</div>
            <p className="text-xs text-gray-400">
              Articles and updates
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-tech-midnight border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              <TrendingUp className="h-8 w-8 mr-2" />
              Chart placeholder (Analytics integration pending)
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-tech-midnight border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Latest updates across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">New Lead Received</p>
                  <p className="text-xs text-gray-400">
                    Just now
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">Project Updated</p>
                  <p className="text-xs text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">Service Added</p>
                  <p className="text-xs text-gray-400">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
