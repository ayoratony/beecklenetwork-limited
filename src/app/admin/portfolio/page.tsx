'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSupabaseClient, Project, type Database } from '@/lib/supabase'
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
import { Plus, Pencil, Trash2, Loader2, Search, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Form state
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: '',
    slug: '',
    description: '',
    client: '',
    completion_date: '',
    website_url: '',
    images: [],
    tags: [],
    featured: false
  })
  
  // Helper state for array inputs
  const [imagesInput, setImagesInput] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  const fetchProjects = useCallback(async () => {
    const supabase = getSupabaseClient()
    setIsLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
    } else {
      setProjects((data as Project[]) || [])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setCurrentProject(project)
      setImagesInput(project.images ? project.images.join(', ') : '')
      setTagsInput(project.tags ? project.tags.join(', ') : '')
    } else {
      setCurrentProject({
        title: '',
        slug: '',
        description: '',
        client: '',
        completion_date: new Date().toISOString().split('T')[0],
        website_url: '',
        images: [],
        tags: [],
        featured: false
      })
      setImagesInput('')
      setTagsInput('')
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    const supabase = getSupabaseClient()
    if (!currentProject.title || !currentProject.slug || !currentProject.description) {
      alert('Please fill in required fields (Title, Slug, Description)')
      return
    }

    setIsSaving(true)
    
    const projectData: Database['public']['Tables']['projects']['Insert'] = {
      id: currentProject.id,
      title: currentProject.title!,
      slug: currentProject.slug!.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: currentProject.description!,
      client: currentProject.client ?? '',
      completion_date: currentProject.completion_date ?? new Date().toISOString().split('T')[0],
      website_url: currentProject.website_url ?? null,
      images: imagesInput.split(',').map(s => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map(s => s.trim()).filter(Boolean),
      featured: currentProject.featured ?? false,
      created_at: currentProject.created_at
    }

    const { error } = await supabase
      .from('projects')
      .upsert(projectData)

    setIsSaving(false)

    if (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project: ' + error.message)
    } else {
      setIsDialogOpen(false)
      fetchProjects()
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = getSupabaseClient()
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    } else {
      fetchProjects()
    }
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-300">Showcase your best work.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <Card className="bg-tech-midnight border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
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
                  <TableHead className="text-white">Client</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Featured</TableHead>
                  <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-gray-400">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-tech-neon-cyan" />
                    </TableCell>
                  </TableRow>
                ) : filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-gray-400">
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">
                        {project.title}
                        {project.website_url && (
                          <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="ml-2 inline-block">
                            <ExternalLink className="h-3 w-3 text-tech-neon-cyan" />
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300">{project.client}</TableCell>
                      <TableCell className="text-gray-300">{project.completion_date}</TableCell>
                      <TableCell>
                        {project.featured ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tech-neon-cyan/10 text-tech-neon-cyan border border-tech-neon-cyan/20">
                            Featured
                          </span>
                        ) : (
                          <span className="text-gray-500 text-xs">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(project)} className="text-tech-neon-cyan hover:text-white hover:bg-white/10">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-white/10" onClick={() => handleDelete(project.id)}>
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
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-tech-midnight border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-orbitron">{currentProject.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-gray-300">Title</Label>
                <Input
                  id="title"
                  value={currentProject.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setCurrentProject(prev => ({ 
                      ...prev, 
                      title,
                      slug: !prev.id ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
                    }))
                  }}
                  placeholder="Project Title"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug" className="text-gray-300">Slug</Label>
                <Input
                  id="slug"
                  value={currentProject.slug}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="project-slug"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="client" className="text-gray-300">Client</Label>
                <Input
                  id="client"
                  value={currentProject.client}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, client: e.target.value }))}
                  placeholder="Client Name"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date" className="text-gray-300">Completion Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={currentProject.completion_date}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, completion_date: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website" className="text-gray-300">Website URL</Label>
              <Input
                id="website"
                value={currentProject.website_url || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, website_url: e.target.value }))}
                placeholder="https://example.com"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={currentProject.description}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Project description..."
                rows={4}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="images" className="text-gray-300">Images (comma separated URLs)</Label>
              <Textarea
                id="images"
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
                placeholder="/images/p1.jpg, /images/p2.jpg"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags" className="text-gray-300">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="web, design, react"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                className="h-4 w-4 rounded border-gray-300 text-tech-neon-cyan focus:ring-tech-neon-cyan bg-white/5 border-white/20"
                checked={currentProject.featured || false}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, featured: e.target.checked }))}
              />
              <Label htmlFor="featured" className="cursor-pointer text-gray-300">Featured Project</Label>
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
