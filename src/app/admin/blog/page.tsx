'use client'

import { useState, useEffect } from 'react'
import { supabase, BlogPost } from '@/lib/supabase'
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
import { Plus, Pencil, Trash2, Loader2, Search, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  
  // Form state
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    published: false,
    published_at: null
  })

  useEffect(() => {
    fetchPosts()
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setCurrentUserId(user.id)
    }
  }

  const fetchPosts = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data || [])
    }
    setIsLoading(false)
  }

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setCurrentPost(post)
    } else {
      setCurrentPost({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        cover_image: '',
        published: false,
        published_at: null,
        author_id: currentUserId || undefined
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.slug || !currentPost.content) {
      alert('Please fill in required fields (Title, Slug, Content)')
      return
    }

    setIsSaving(true)
    
    const postData = {
      ...currentPost,
      // Ensure slug is URL friendly
      slug: currentPost.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      // Set author if not set
      author_id: currentPost.author_id || currentUserId,
      // Update published_at if publishing for the first time
      published_at: currentPost.published && !currentPost.published_at 
        ? new Date().toISOString() 
        : currentPost.published_at
    }

    const { error } = await supabase
      .from('blog_posts')
      .upsert(postData as any)

    setIsSaving(false)

    if (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post: ' + error.message)
    } else {
      setIsDialogOpen(false)
      fetchPosts()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    } else {
      fetchPosts()
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-gray-300">Manage your blog content.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue">
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <Card className="bg-tech-midnight border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
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
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Published Date</TableHead>
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
                ) : filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-gray-400">
                      No posts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-gray-400" />
                          {post.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.published ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-900/50">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                            Draft
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(post)} className="text-tech-neon-cyan hover:text-white hover:bg-white/10">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-white/10" onClick={() => handleDelete(post.id)}>
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
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-tech-midnight border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-orbitron">{currentPost.id ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                value={currentPost.title}
                onChange={(e) => {
                  const title = e.target.value
                  setCurrentPost(prev => ({ 
                    ...prev, 
                    title,
                    slug: !prev.id ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
                  }))
                }}
                placeholder="Post Title"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="slug" className="text-gray-300">Slug</Label>
              <Input
                id="slug"
                value={currentPost.slug}
                onChange={(e) => setCurrentPost(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="post-slug"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt" className="text-gray-300">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={currentPost.excerpt || ''}
                onChange={(e) => setCurrentPost(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief summary of the post..."
                rows={2}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cover" className="text-gray-300">Cover Image URL</Label>
              <Input
                id="cover"
                value={currentPost.cover_image || ''}
                onChange={(e) => setCurrentPost(prev => ({ ...prev, cover_image: e.target.value }))}
                placeholder="/images/blog-cover.jpg"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content" className="text-gray-300">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                value={currentPost.content}
                onChange={(e) => setCurrentPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="# Heading\n\nWrite your post content here..."
                className="font-mono min-h-[200px] bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                className="h-4 w-4 rounded border-gray-300 text-tech-neon-cyan focus:ring-tech-neon-cyan bg-white/5 border-white/20"
                checked={currentPost.published || false}
                onChange={(e) => setCurrentPost(prev => ({ ...prev, published: e.target.checked }))}
              />
              <Label htmlFor="published" className="cursor-pointer text-gray-300">Publish now</Label>
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
