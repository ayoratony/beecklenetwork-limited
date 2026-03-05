'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, FileText, Briefcase, Settings, Menu, X, LogOut, Layers, Info } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Leads', href: '/admin/leads' },
  { icon: Layers, label: 'Services', href: '/admin/services' },
  { icon: Briefcase, label: 'Portfolio', href: '/admin/portfolio' },
  { icon: FileText, label: 'Blog', href: '/admin/blog' },
  { icon: Info, label: 'About Us', href: '/admin/about' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      // Skip check for login page
      if (pathname === '/admin/login') {
        setIsLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [pathname, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tech-deep-space flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tech-neon-cyan"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tech-deep-space flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 h-screen w-64 bg-tech-midnight border-r border-white/10 z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <Link href="/admin" className="text-xl font-orbitron font-bold text-white">
            <span className="text-tech-neon-cyan">BEECKLE</span> ADMIN
          </Link>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-tech-neon-cyan/10 text-tech-neon-cyan border border-tech-neon-cyan/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-red-500/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden p-4 bg-tech-midnight border-b border-white/10 flex justify-between items-center">
          <Link href="/admin" className="text-lg font-orbitron font-bold text-white">
            <span className="text-tech-neon-cyan">BEECKLE</span> ADMIN
          </Link>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
