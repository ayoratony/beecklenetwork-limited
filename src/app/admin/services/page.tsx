'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, Service, type Database } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Form state
  const [currentService, setCurrentService] = useState<Partial<Service>>({
    title: '',
    slug: '',
    description: '',
    category: '',
    icon_url: ''
  })

  const fetchServices = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching services:', error)
    } else {
      setServices((data as Service[]) || [])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setCurrentService(service)
    } else {
      setCurrentService({
        title: '',
        slug: '',
        description: '',
        category: '',
        icon_url: ''
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!currentService.title || !currentService.slug || !currentService.description || !currentService.category) {
      alert('Please fill in all required fields')
      return
    }

    setIsSaving(true)
    
    const serviceData: Database['public']['Tables']['services']['Insert'] = {
      id: currentService.id,
      title: currentService.title!,
      slug: currentService.slug!.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: currentService.description!,
      category: currentService.category!,
      icon_url: currentService.icon_url ?? null,
      created_at: currentService.created_at
    }

    const { error } = await supabase
      .from('services')
      .upsert(serviceData)

    setIsSaving(false)

    if (error) {
      console.error('Error saving service:', error)
      alert('Failed to save service: ' + error.message)
    } else {
      setIsDialogOpen(false)
      fetchServices()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting service:', error)
      alert('Failed to delete service')
    } else {
      fetchServices()
    }
  }

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Services</h1>
          <p className="text-gray-300">Manage your service offerings.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue">
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <Card className="bg-tech-midnight border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                className="pl-8 bg-white/5 border-white/20 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border border-white/10">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-white">Title</TableHead>
                  <TableHead className="text-white">Category</TableHead>
                  <TableHead className="text-white">Slug</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-gray-400">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-tech-neon-cyan" />
                    </TableCell>
                  </TableRow>
                ) : filteredServices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-gray-400">
                      No services found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredServices.map((service) => (
                    <TableRow key={service.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{service.title}</TableCell>
                      <TableCell className="text-gray-300">{service.category}</TableCell>
                      <TableCell className="text-gray-400">{service.slug}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(service)} className="text-tech-neon-cyan hover:text-white hover:bg-white/10">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-white/10" onClick={() => handleDelete(service.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-tech-midnight border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-orbitron">{currentService.id ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                value={currentService.title}
                onChange={(e) => {
                  const title = e.target.value
                  setCurrentService(prev => ({ 
                    ...prev, 
                    title,
                    slug: !prev.id ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
                  }))
                }}
                placeholder="e.g. Web Development"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug" className="text-gray-300">Slug</Label>
              <Input
                id="slug"
                value={currentService.slug}
                onChange={(e) => setCurrentService(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. web-development"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-gray-300">Category</Label>
              <Select 
                value={currentService.category} 
                onValueChange={(val) => setCurrentService(prev => ({ ...prev, category: val }))}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-tech-midnight border-white/20 text-white">
                  <SelectItem value="Web Dev" className="focus:bg-white/10 focus:text-white">Web Dev</SelectItem>
                  <SelectItem value="Software" className="focus:bg-white/10 focus:text-white">Software</SelectItem>
                  <SelectItem value="Security" className="focus:bg-white/10 focus:text-white">Security</SelectItem>
                  <SelectItem value="Network" className="focus:bg-white/10 focus:text-white">Network</SelectItem>
                  <SelectItem value="Automation" className="focus:bg-white/10 focus:text-white">Automation</SelectItem>
                  <SelectItem value="Cloud" className="focus:bg-white/10 focus:text-white">Cloud</SelectItem>
                  <SelectItem value="Other" className="focus:bg-white/10 focus:text-white">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={currentService.description}
                onChange={(e) => setCurrentService(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Service description..."
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon" className="text-gray-300">Icon URL</Label>
              <Input
                id="icon"
                value={currentService.icon_url || ''}
                onChange={(e) => setCurrentService(prev => ({ ...prev, icon_url: e.target.value }))}
                placeholder="/icons/service.svg"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue">
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
