'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSupabaseClient, CompanyInfo, type Database } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Save, Info } from 'lucide-react'

export default function AdminAboutPage() {
  const [info, setInfo] = useState<Partial<CompanyInfo>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [valuesInput, setValuesInput] = useState('')
  const [tableMissing, setTableMissing] = useState(false)

  const fetchInfo = useCallback(async () => {
    const supabase = getSupabaseClient()
    setIsLoading(true)
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .limit(1)
      .single()

    const companyInfo = data as CompanyInfo | null

    if (error) {
      if (error.code === '42P01') { // Table does not exist
        setTableMissing(true)
      } else if (error.code !== 'PGRST116') { // PGRST116 is "Row not found"
        console.error('Error fetching company info:', error)
      }
    } else if (companyInfo) {
      setInfo(companyInfo)
      setValuesInput(companyInfo.values ? companyInfo.values.join(', ') : '')
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  const handleSave = async () => {
    const supabase = getSupabaseClient()
    setIsSaving(true)
    
    const updates: Database['public']['Tables']['company_info']['Update'] = {
      ...info,
      values: valuesInput.split(',').map(s => s.trim()).filter(Boolean),
      updated_at: new Date().toISOString()
    }

    // If no ID, we are inserting (should technically be handled by migration, but good fallback)
    // But since we are using single row, we just upsert or update if we have ID.
    // If we have no ID, we let Supabase generate it.
    
    // Check if we have an ID, if not, it's a new insert
    let result
    if (info.id) {
       result = await supabase
        .from('company_info')
        .update(updates)
        .eq('id', info.id)
    } else {
       const insertData: Database['public']['Tables']['company_info']['Insert'] = {
        ...updates,
        about_content: updates.about_content ?? ''
       }
       result = await supabase
        .from('company_info')
        .insert(insertData)
    }

    const { error } = result

    setIsSaving(false)

    if (error) {
      console.error('Error saving info:', error)
      alert('Failed to save info: ' + error.message)
    } else {
      alert('Company info updated successfully')
      fetchInfo()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-tech-neon-cyan" />
      </div>
    )
  }

  if (tableMissing) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-2">Database Setup Required</h2>
        <p className="mb-4">The <code>company_info</code> table does not exist in your Supabase database.</p>
        <p className="mb-2">Please run the following SQL in your Supabase SQL Editor:</p>
        <pre className="bg-black/50 p-4 rounded text-sm overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS company_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Beeckle Network',
  tagline TEXT,
  about_title TEXT NOT NULL DEFAULT 'About Us',
  about_content TEXT NOT NULL,
  mission_title TEXT DEFAULT 'Our Mission',
  mission_content TEXT,
  vision_title TEXT DEFAULT 'Our Vision',
  vision_content TEXT,
  values TEXT[] DEFAULT '{}',
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read company info" ON company_info;
DROP POLICY IF EXISTS "Authenticated update company info" ON company_info;
DROP POLICY IF EXISTS "Authenticated insert company info" ON company_info;

CREATE POLICY "Public read company info" ON company_info FOR SELECT USING (true);
CREATE POLICY "Authenticated update company info" ON company_info FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated insert company info" ON company_info FOR INSERT WITH CHECK (auth.role() = 'authenticated');`}
        </pre>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">About Us Content</h1>
          <p className="text-gray-300">Manage your company information, mission, and vision.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Info */}
        <Card className="bg-tech-midnight border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Info className="mr-2 h-5 w-5 text-tech-neon-cyan" />
              General Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="company_name" className="text-gray-300">Company Name</Label>
              <Input
                id="company_name"
                value={info.company_name || ''}
                onChange={(e) => setInfo({ ...info, company_name: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tagline" className="text-gray-300">Tagline</Label>
              <Input
                id="tagline"
                value={info.tagline || ''}
                onChange={(e) => setInfo({ ...info, tagline: e.target.value })}
                placeholder="Innovating the future..."
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="bg-tech-midnight border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Main Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="about_title" className="text-gray-300">Section Title</Label>
              <Input
                id="about_title"
                value={info.about_title || ''}
                onChange={(e) => setInfo({ ...info, about_title: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="about_content" className="text-gray-300">Content</Label>
              <Textarea
                id="about_content"
                value={info.about_content || ''}
                onChange={(e) => setInfo({ ...info, about_content: e.target.value })}
                rows={5}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="bg-tech-midnight border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="mission_title" className="text-gray-300">Title</Label>
              <Input
                id="mission_title"
                value={info.mission_title || ''}
                onChange={(e) => setInfo({ ...info, mission_title: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mission_content" className="text-gray-300">Content</Label>
              <Textarea
                id="mission_content"
                value={info.mission_content || ''}
                onChange={(e) => setInfo({ ...info, mission_content: e.target.value })}
                rows={4}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="bg-tech-midnight border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="vision_title" className="text-gray-300">Title</Label>
              <Input
                id="vision_title"
                value={info.vision_title || ''}
                onChange={(e) => setInfo({ ...info, vision_title: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vision_content" className="text-gray-300">Content</Label>
              <Textarea
                id="vision_content"
                value={info.vision_content || ''}
                onChange={(e) => setInfo({ ...info, vision_content: e.target.value })}
                rows={4}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <Card className="bg-tech-midnight border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Core Values</CardTitle>
            <CardDescription className="text-gray-400">Comma separated values (e.g. Integrity, Innovation, Trust)</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={valuesInput}
              onChange={(e) => setValuesInput(e.target.value)}
              placeholder="Value 1, Value 2, Value 3"
              className="bg-white/5 border-white/20 text-white"
            />
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-tech-midnight border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contact_email" className="text-gray-300">Email</Label>
              <Input
                id="contact_email"
                value={info.contact_email || ''}
                onChange={(e) => setInfo({ ...info, contact_email: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_phone" className="text-gray-300">Phone</Label>
              <Input
                id="contact_phone"
                value={info.contact_phone || ''}
                onChange={(e) => setInfo({ ...info, contact_phone: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Input
                id="address"
                value={info.address || ''}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
