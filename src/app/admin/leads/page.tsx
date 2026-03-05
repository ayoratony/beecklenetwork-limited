'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, type Lead } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Search, Eye, Edit, Trash2, Plus, Mail, Phone, User, Calendar, MessageSquare, LogOut } from 'lucide-react'

export default function AdminLeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({ status: '', notes: '' })

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
    } else {
      fetchLeads()
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      setLeads(data || [])
    } catch (error) {
      console.error('Error fetching leads:', error)
      // No mock data fallback for admin - we want real data or error
    } finally {
      setLoading(false)
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.service_interest.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead)
    setEditForm({ status: lead.status, notes: lead.notes || '' })
    setIsEditDialogOpen(true)
  }

  const handleUpdateLead = async () => {
    if (!selectedLead) return

    try {
      const response = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-admin-token' // In real app, use proper auth
        },
        body: JSON.stringify(editForm)
      })

      if (!response.ok) {
        throw new Error('Failed to update lead')
      }

      // Update local state
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, status: editForm.status as Lead['status'], notes: editForm.notes }
          : lead
      ))

      setIsEditDialogOpen(false)
      setSelectedLead(null)
    } catch (error) {
      console.error('Error updating lead:', error)
      alert('Failed to update lead')
    }
  }

  const getStatusBadge = (status: Lead['status']) => {
    const variants = {
      New: 'bg-blue-500 hover:bg-blue-600',
      Contacted: 'bg-yellow-500 hover:bg-yellow-600',
      Closed: 'bg-green-500 hover:bg-green-600'
    }
    
    return (
      <Badge className={variants[status]}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
            Lead Management
          </h1>
          <p className="text-gray-300">
            Manage and track all contact form submissions from your website.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
        <Card className="bg-tech-midnight border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-tech-midnight border-white/20">
                    <SelectItem value="all" className="text-white">All Status</SelectItem>
                    <SelectItem value="New" className="text-white">New</SelectItem>
                    <SelectItem value="Contacted" className="text-white">Contacted</SelectItem>
                    <SelectItem value="Closed" className="text-white">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card className="bg-tech-midnight border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Contact Leads</CardTitle>
            <CardDescription className="text-gray-300">
              {filteredLeads.length} of {leads.length} total leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tech-neon-cyan mx-auto"></div>
                <p className="text-gray-300 mt-4">Loading leads...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Service</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="border-white/10">
                        <TableCell className="text-white">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{lead.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{lead.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{lead.service_interest}</TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell className="text-gray-300">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-tech-midnight border-white/20">
                                <DialogHeader>
                                  <DialogTitle className="text-white">Lead Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-gray-300">Name</Label>
                                    <p className="text-white">{lead.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Email</Label>
                                    <p className="text-white">{lead.email}</p>
                                  </div>
                                  {lead.phone && (
                                    <div>
                                      <Label className="text-gray-300">Phone</Label>
                                      <p className="text-white">{lead.phone}</p>
                                    </div>
                                  )}
                                  <div>
                                    <Label className="text-gray-300">Service Interest</Label>
                                    <p className="text-white">{lead.service_interest}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-300">Message</Label>
                                    <p className="text-white bg-white/5 p-3 rounded">{lead.message}</p>
                                  </div>
                                  {lead.notes && (
                                    <div>
                                      <Label className="text-gray-300">Notes</Label>
                                      <p className="text-white bg-white/5 p-3 rounded">{lead.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-green-400 hover:text-green-300"
                              onClick={() => handleEdit(lead)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-tech-midnight border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Update Lead Status</DialogTitle>
              <DialogDescription className="text-gray-300">
                Update the status and add notes for this lead.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label className="text-white">Status</Label>
                <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-tech-midnight border-white/20">
                    <SelectItem value="New" className="text-white">New</SelectItem>
                    <SelectItem value="Contacted" className="text-white">Contacted</SelectItem>
                    <SelectItem value="Closed" className="text-white">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-white">Notes</Label>
                <Textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  placeholder="Add any notes about this lead..."
                  rows={4}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateLead}
                className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue"
              >
                Update Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}